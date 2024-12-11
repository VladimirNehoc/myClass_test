import { sequelize } from '../../config/database';
import { Lesson } from './lessons';
import { Teacher } from './teachers';
import { Student } from './students';
import { LessonTeacher } from './lesson_teachers';
import { LessonStudent } from './lesson_students';
import { associateModels } from './associations';

const models = {
  Lesson,
  Teacher,
  Student,
  LessonTeacher,
  LessonStudent,
};

associateModels();

export default models;
export { sequelize };
