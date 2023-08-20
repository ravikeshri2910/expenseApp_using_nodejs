const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const sinups = sequelize.define('sinups',{

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
    passWord : Sequelize.STRING,
    isPremium : Sequelize.BOOLEAN,
});

module.exports = sinups;