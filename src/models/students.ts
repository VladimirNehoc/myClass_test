import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../config/database';
import { Lesson } from './lessons';

export class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
  declare id: number;
  declare name: string;

  studentLessons?: Lesson[];
  lesson_students?: { visit: boolean };
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'students',
    timestamps: false,
  }
);
