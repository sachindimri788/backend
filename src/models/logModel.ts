const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;
const Log = sequelize.define(
  'logTime',
  {
    logId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'LogId',
      autoIncrement:true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'UserId',
    },
    inTime: {
      type: DataTypes.DATE,
      field: 'InTime',
    },
    outTime:{
        type:DataTypes.DATE,
        field:'OutTime',
    },
    createdBy:{
        type:DataTypes.STRING,
        field:'CreatedBy',
    },
    createdTime:{
      type:DataTypes.DATE,
      field:'CreatedTime'
    },
    updatedTime:{
      type:DataTypes.DATE,
      field:'UpdatedTime'
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);
export default Log;