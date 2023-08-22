const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')


const sequelize = require('./utill/database');
const SinUp = require('./models/userSinup')
const ExpenseData = require('./models/expenseData');
const expenseRouter = require('./router/expenseDataRout')
const userRouter = require('./router/userDataRout')
const Order = require('./models/order')
const purchaseRouter = require('./router/purchase')
const premiumRouter = require('./router/premium')
const passwordRouter = require('./router/forgetPassword')



const app = express();
app.use(cors());
app.use(bodyParser.json());

// Association
SinUp.hasMany(ExpenseData)
ExpenseData.belongsTo(SinUp)

SinUp.hasMany(Order);
Order.belongsTo(SinUp)


// creating expense
app.use('/logIn', expenseRouter)


//sinup and login data
app.use('/user', userRouter)


//primum route
app.use('/purchase', purchaseRouter)

//Premium Feature
app.use('/premium', premiumRouter)

// forget password
app.use('/password', passwordRouter)



sequelize
    .sync()
    // .sync({force:true})
    .then(result => {
        app.listen(4000)
    })
    .catch(err => console.log(err))