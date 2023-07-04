const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const BusinessNature = sequelize.define(
  'businessnature',
  {
    businessNatureId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'BusinessNatureId',
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

export default BusinessNature;
