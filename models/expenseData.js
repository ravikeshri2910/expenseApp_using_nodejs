
const Sequelize = require('sequelize');


const sequelize = require('../utill/database');


const expenseData = sequelize.define('expensedata', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expense: {
        type :Sequelize.STRING,
        allowNull : false
    },

    description: {
        type :Sequelize.STRING,
        allowNull : false
    },

    category: {
        type: Sequelize.STRING,
        allowNull: false
    }


});

module.exports = expenseData;