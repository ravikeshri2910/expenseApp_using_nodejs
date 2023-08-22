const ExpenseData = require('../models/expenseData');
const SinUp = require('../models/userSinup');
const sequelize = require('../utill/database');


exports.leadboardDetails = async (req, res) => {
    // console.log("leadboardDetails")


    let users = await SinUp.findAll({

        attributes : ['name','totalExpense'],
        order : [['totalExpense','DESC']]


        // //The query includes a join with the 'ExpenseData' table, but only selects the 'id' and 'name' columns from 'SinUp'. 
        // include : [
        //     {
        //         model : ExpenseData,
        //         attributes : []
        //     }
        // ],

        // //The interesting part of the query is in the 'attributes' option, which specifies that the result should include a calculated column named 'total_cost'. This column is calculated using the 'sum' SQL function applied to the 'expense' column of 'ExpenseData'.
        // attributes : ['id','name',[sequelize.fn('sum', sequelize.col('expensedata.expense')),'total_cost']],

        // //The 'group' option is used to group the results by 'SinUp.id'(only by table wiche we using after await)
        // group : ['id'],

        // //the 'order' option is used to sort the results by the calculated 'total_cost' column in descending order
        // order : [['total_cost','DESC']]
        
    })
    // let data = await ExpenseData.findAll()


    // console.log(users)
   
    res.status(201).json({ udata: users})

}

