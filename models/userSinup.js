const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const sinUp = sequelize.define('sinUp',{

    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : Sequelize.STRING,
    email: {
        type : Sequelize.STRING,
        unique : true
    },
    passWord : Sequelize.STRING
});

module.exports = sinUp;