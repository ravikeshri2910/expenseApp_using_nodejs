const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const sequelize = require('./utill/database');
const sinUp = require('./models/userSinup')


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/user/expense-sinup-data', async (req, res, next)=>{

    try{
    console.log('here')

    const name = req.body.name;
    const email = req.body.email;
    const passWord = req.body.password;

    await sinUp.create({
        name: name,
        email : email,
        passWord : passWord
    })

    res.status(201).json({data : sinUp})
}catch (error) {
    console.error("error 66"+ error);
    if(error == 'SequelizeUniqueConstraintError: Validation error'){
        console.log('fucked')
        res.status(400).json({ message: 'Email is registered' });
    }
  }


})

sequelize
    .sync()
    // .sync({force:true})
    .then(result => {
        app.listen(4000)
    })
    .catch(err => console.log(err))