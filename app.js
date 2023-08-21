const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')


const sequelize = require('./utill/database');
const sinUp = require('./models/userSinup')
const expenseData = require('./models/expenseData');
const expenseRouter = require('./router/expenseDataRout')
const userRouter = require('./router/userDataRout')
const Order = require('./models/order')
const purchaseRouter = require('./router/purchase')
const premiumRouter = require('./router/premium')



const app = express();
app.use(cors());
app.use(bodyParser.json());

// Association
sinUp.hasMany(expenseData)
expenseData.belongsTo(sinUp)

sinUp.hasMany(Order);
Order.belongsTo(sinUp)


// creating expense
app.use('/logIn',expenseRouter)


//sinup and login data
app.use('/user', userRouter)


//primum route
app.use('/purchase',purchaseRouter)

//Premium Feature
app.use('/premium',premiumRouter)





sequelize
    .sync()
    // .sync({force:true})
    .then(result => {
        app.listen(4000)
    })
    .catch(err => console.log(err))