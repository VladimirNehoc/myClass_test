import Joi from 'joi';

export const lessonFiltersSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}(,\d{4}-\d{2}-\d{2})?$/)
    .optional()
    .custom((value, helpers) => {
      try {
        return value.split(',');
      } catch {
        return helpers.error('any.invalid');
      }
    })
    .messages({
      'string.pattern.base': 'Некорректный формат даты. Ожидается YYYY-MM-DD или YYYY-MM-DD,YYYY-MM-DD.',
    }),
  status: Joi.number()
    .valid(0, 1)
    .optional()
    .messages({
      'any.only': 'Статус должен быть 0 или 1.',
    }),
  teacherIds: Joi.string()
    .pattern(/^\d+(,\d+)*$/)
    .optional()
    .custom((value, helpers) => {
      try {
        return value.split(',');
      } catch {
        return helpers.error('any.invalid');
      }
    })
    .messages({
      'string.pattern.base': 'teacherIds должен быть строкой с числами, разделенными запятыми.',
    }),
  studentsCount: Joi.string()
    .pattern(/^\d+(,\d+)?$/)
    .optional()
    .custom((value, helpers) => {
      try {
        return value.split(',').map((v: string) => Number(v));
      } catch {
        return helpers.error('any.invalid');
      }
    })
    .messages({
      'string.pattern.base': 'studentsCount должен быть числом или двумя числами через запятую.',
    }),
  page: Joi.number().integer().positive().optional().messages({
    'number.base': 'Номер страницы должен быть числом.',
    'number.positive': 'Номер страницы должен быть больше нуля.',
  }),
  lessonsPerPage: Joi.number().integer().positive().optional().default(5).messages({
    'number.base': 'Количество занятий на странице должно быть числом.',
    'number.positive': 'Количество занятий на странице должно быть больше нуля.',
  }),
});