const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')


const sequelize = require('./utill/database');
const SinUp = require('./models/userSinup')
const ExpenseData = require('./models/expenseData');
const expenseRouter = require('./router/expenseDataRout')
const userRouter = require('./router/userDataRout')
const Order = require('./models/order')
const purchaseRouter = require('./router/purchase')
const premiumRouter = require('./router/premium')
const passwordRouter = require('./router/forgetPassword')
const Forgetpassword = require('./models/forgetPassRequest')
const Download = require('./models/downloadData')

// const logData = fs.createWriteStream(
//     path.join(__dirname , 'access.log'),
//     {flags : "a"}
// );

const app = express();

// app.use(function(req, res, next){
//     res.header("Content-Security-Policy", "default-src * 'unsafe-inline'  'unsafe-eval' data: blob:;")
//     next();
//  })

 app.use(function(req, res, next){ 
    res.header("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; form-action 'self';") 
    next(); 
})

//app.use(helmet()) // this is use for increasing Security  after deploying
app.use(compression()) // it is use to decrease the file size we sending to the client
//app.use(morgan('combined',{stream : logData})) // it is use to collect log details .
app.use(cors()); // this is use to connect frontend to backend and vice-verse
app.use(bodyParser.json()); //this is use to convert the data into json

// Association
SinUp.hasMany(ExpenseData)
ExpenseData.belongsTo(SinUp)

SinUp.hasMany(Order);
Order.belongsTo(SinUp)

SinUp.hasMany(Forgetpassword)
Forgetpassword.belongsTo(SinUp)

SinUp.hasMany(Download);
Download.belongsTo(SinUp)


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


// this is dynamic rout for frontend
app.use((req,res)=>{

    res.sendFile(path.join(__dirname, `views/${req.url}`))
})

// http://localhost:4000/password/resetpassword


sequelize
    .sync()
    // .sync({force:true}) // this is use to forcly delete all tables and creates new tables
    .then(result => {
        app.listen(process.env.PORT)
    })
    .catch(err => console.log(err))