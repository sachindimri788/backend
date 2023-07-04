import { DataTypes } from 'sequelize';
const sequelize = require('../../config/db');
import Role from './roleModel';
import Department from './departmentModel';
import UserRoles from './userinroles';

const User = sequelize.define(
  'user',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'UserId',
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      field: 'Name',
    },
    emailId: {
      type: DataTypes.STRING,
      field: 'Email',
    },
    mobileNo: {
      type: DataTypes.STRING,
      field: 'Mobile',
    },
    departmentId: {
      type: DataTypes.INTEGER,
      field: 'DepartmentId',
    },
    status: {
      type: DataTypes.TINYINT,
      field: 'IsActive',
    },
    lastLoggedIn: {
      type: DataTypes.DATE,
      field: 'LastLoggedIn',
    },
    createdDate: {
      type: DataTypes.DATE,
      field: 'CreatedDate',
    },
    modifiedDate: {
      type: DataTypes.DATE,
      field: 'ModifiedDate',
    },
    modifiedBy: {
      type: DataTypes.STRING,
      field: 'ModifiedBy',
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'CreatedBy',
    },
    password:{
      type: DataTypes.STRING,
      field:'Password',
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

User.belongsToMany(Role, {
  through: UserRoles,
  foreignKey: 'UserId',
  otherKey: 'RoleId',
});
User.belongsTo(Department, { foreignKey: 'DepartmentId' });
User.belongsTo(UserRoles, { foreignKey: 'UserId' });
User.hasMany(UserRoles, { foreignKey: 'userId' });
UserRoles.belongsTo(User, { foreignKey: 'userId' });
UserRoles.belongsTo(Role, { foreignKey: 'roleId' });



export default User;