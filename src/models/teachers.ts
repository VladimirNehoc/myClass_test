import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../config/database';
import { Lesson } from './lessons';

export class Teacher extends Model<InferAttributes<Teacher>, InferCreationAttributes<Teacher>> {
  declare id: number;
  declare name: string;

  lessons?: Lesson[];
}

Teacher.init(
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
    modelName: 'teachers',
    timestamps: false,
  }
)
