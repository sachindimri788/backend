const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const UserRoles = sequelize.define(
  'userinroles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'Id',
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'UserId',
    },
    roleId: {
      type: DataTypes.INTEGER,
      field: 'RoleId',
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

export default UserRoles;
