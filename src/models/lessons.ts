import { Model, DataTypes, Optional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../config/database';
import { Student } from './students';
import { Teacher } from './teachers';

export class Lesson extends Model<InferAttributes<Lesson>, InferCreationAttributes<Lesson>> {
  declare id: number;
  declare date: string;
  declare title: string;
  declare status: number;

  students?: Student[];
  teachers?: Teacher[];
}

Lesson.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'lessons',
    timestamps: false,
  }
);
