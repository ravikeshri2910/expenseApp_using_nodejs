const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenseapp','root','RAVI8271ravi@',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;
