const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const BusinessType = sequelize.define(
  'businesstype',
  {
    businessTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'BusinessTypeId',
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

export default BusinessType;
