import { Model, DataTypes, InferCreationAttributes, InferAttributes } from 'sequelize';
import { sequelize } from '../../config/database';
import { Student } from './students';
import { Lesson } from './lessons';

export class LessonStudent extends Model<InferAttributes<LessonStudent>, InferCreationAttributes<LessonStudent>> {
  declare lesson_id: number;
  declare student_id: number;
  declare visit: boolean;
}

LessonStudent.init(
  {
    lesson_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lessons',
        key: 'id',
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'students',
        key: 'id',
      },
    },
    visit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'lesson_students',
    timestamps: false,
  }
);

Lesson.belongsToMany(Student, { through: LessonStudent });
Student.belongsToMany(Lesson, { through: LessonStudent });
