require('dotenv').config({path:'./env/development.env'})

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('groyyo', 'root', 'TajMahal', {
    host: process.env.HOST,
    dialect: 'mysql',
  });

  sequelize.authenticate().then(() => {
    console.log('Database Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
  module.exports = sequelize;