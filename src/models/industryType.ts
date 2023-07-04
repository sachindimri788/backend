const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const IndustryType = sequelize.define(
  'industrytype',
  {
    industryTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'IndustryTypeId',
    },
    name: {
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

export default IndustryType;
