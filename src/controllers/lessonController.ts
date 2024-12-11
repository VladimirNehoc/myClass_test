import { Request, Response } from 'express';
import { Op, Sequelize, WhereOptions } from 'sequelize';

import { Lesson } from '../models/lessons';
import { Teacher } from '../models/teachers';
import { Student } from '../models/students';
import { lessonFiltersSchema } from '../validation/lessonFilters';

interface LessonsFilters {
  date?: [string, string?];
  status?: 0 | 1;
  teacherIds?: string[];
  studentsCount?: [string, string?];
  page?: number;
  lessonsPerPage?: number;
}

export const getLessons = async (req: Request, res: Response) => {
  try {
    const { error, value: filters } = lessonFiltersSchema.validate(req.query);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { date, status, teacherIds, studentsCount, page = 1, lessonsPerPage = 20 } = filters as LessonsFilters;
    const lessonsWhere: Array<WhereOptions> = [];
    const teacherWhere: Array<WhereOptions> = [];

    // date filter
    if (date) {
      if (date.length === 1) {
        lessonsWhere.push({ date: date[0] });
      } else if (date.length === 2) {
        lessonsWhere.push({
          date: { [Op.between]: [date[0], date[1]] },
        });
      }
    }

    // status filter
    if (status !== undefined) {
      lessonsWhere.push({ status })
    }

    // studentsCount filter
    if (studentsCount) {
      lessonsWhere.push(Sequelize.literal(`
        (SELECT COUNT(*) 
          FROM "lesson_students" 
          WHERE "lesson_students"."lesson_id" = "lessons"."id"
        ) = ${studentsCount}`))
    }

    // teacherIds filter
    if (teacherIds) {
      teacherWhere.push({ id: { [Op.in]: teacherIds } });
    }

    const limit = lessonsPerPage ? Number(lessonsPerPage) : null;
    const offset = lessonsPerPage ? (page - 1) * Number(lessonsPerPage) : null;

    await Lesson.findAll({
      where: {
        [Op.and]: lessonsWhere
      },
      attributes: [
        'id',
        'date',
        'title',
        'status',
        [
          Sequelize.literal(`
            (SELECT COUNT(*) 
              FROM "lesson_students" 
              WHERE "lesson_students"."lesson_id" = "lessons"."id"
              AND "lesson_students"."visit" = true
            )`),
          'visitCount'
        ]
      ],
      include: [
        {
          model: Student,
          attributes: [
            'id',
            'name',
            [
              Sequelize.literal(`
                (SELECT "visit" 
                  FROM "lesson_students" 
                  WHERE "lesson_students"."lesson_id" = "lessons"."id" 
                  AND "lesson_students"."student_id" = "students"."id"
                )`),
              'visit'
            ]
          ],
          through: { attributes: [] },
        },
        {
          model: Teacher,
          attributes: ['id', 'name'],
          through: { attributes: [] },
          where: {
            [Op.and]: teacherWhere
          },
        },
      ],
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    }).then(result => res.json(result))
      .catch(console.log)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Ошибка при обработке запроса' });
  }
};
