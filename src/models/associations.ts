import { Lesson } from './lessons';
import { Teacher } from './teachers';
import { Student } from './students';
import { LessonTeacher } from './lesson_teachers';
import { LessonStudent } from './lesson_students';

export const associateModels = () => {
  Lesson.belongsToMany(Teacher, { through: LessonTeacher, foreignKey: 'lesson_id' });
  Teacher.belongsToMany(Lesson, { through: LessonTeacher, foreignKey: 'teacher_id' });

  Lesson.belongsToMany(Student, { through: LessonStudent, foreignKey: 'lesson_id' });
  Student.belongsToMany(Lesson, { through: LessonStudent, foreignKey: 'student_id' });
};
