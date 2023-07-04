const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const Role = sequelize.define(
  'role',
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'RoleId',
    },
    role: {
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

export default Role;
