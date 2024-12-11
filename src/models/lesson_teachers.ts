import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../config/database';

export class LessonTeacher extends Model<InferAttributes<LessonTeacher>, InferCreationAttributes<LessonTeacher>> {
  declare lesson_id: number;
  declare teacher_id: number;
}

LessonTeacher.init(
  {
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'lesson_teachers',
    timestamps: false,
  }
);
