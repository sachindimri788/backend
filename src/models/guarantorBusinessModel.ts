const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const GuarantorBusiness = sequelize.define(
  'guarantorbusiness',
  {
    guarantorBusinessId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'GuarantorBusinessId',
    },
    name: {
      type: DataTypes.STRING,
      field: 'CompanyName',
    },
    cin: {
      type: DataTypes.STRING,
      field: 'CIN',
    },
    registrationNo: {
      type: DataTypes.STRING,
      field: 'RegistrationNo',
    },
    incorporationDate: {
      type: DataTypes.DataTypes.DATE,
      field: 'IncorporationDate',
    },
    regAddress: {
      type: DataTypes.STRING,
      field: 'RegAddress',
    },
    businessNatureId: {
      type: DataTypes.INTEGER,
      field: 'BusinessNatureId',
    },
    industryTypeId: {
      type: DataTypes.INTEGER,
      field: 'IndustryTypeId',
    },
    workingCapital: {
      type: DataTypes.DECIMAL,
      field: 'WorkingCapital',
    },
    authCapital: {
      type: DataTypes.DECIMAL,
      field: 'AuthCapital',
    },
    paidUpCapital: {
      type: DataTypes.DECIMAL,
      field: 'PaidUpCapital',
    },
    signatoryDetails: {
      type: DataTypes.STRING,
      field: 'SignatoryDetails',
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'CreatedBy',
    },
    createdDate: {
      type: DataTypes.DATE,
      field: 'CreatedDate',
    },
    modifiedBy: {
      type: DataTypes.STRING,
      field: 'ModifiedBy',
    },
    modifiedDate: {
      type: DataTypes.DATE,
      field: 'ModifiedDate',
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default GuarantorBusiness;
