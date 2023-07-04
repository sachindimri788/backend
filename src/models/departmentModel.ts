const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Department = sequelize.define(
  'department',
  {
    departmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'DepartmentId',
    },
    department: {
      type: DataTypes.STRING,
      field: 'Name',
    },
    isActive: {
      type: DataTypes.TINYINT,
      field: 'IsActive',
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default Department;
