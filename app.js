const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const sequelize = require('./utill/database');
const sinUp = require('./models/userSinup')


const app = express();
app.use(cors());
app.use(bodyParser.json());

//sinup data
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
}catch (err) {
    console.error("error 66"+ err);
    if(err == 'SequelizeUniqueConstraintError: Validation error'){
       
        res.status(400).json(err);
    }
  }


})


app.post('/user/expense-login-data', async(req, res)=>{
    try{
    const logInemail = req.body.email
    const logInPassword = req.body.password

    const user = await sinUp.findAll({where : {email : logInemail}})

    console.log(user[0].passWord)

    if(user[0].passWord == logInPassword){
        res.status(201).json({msg : 'Login Succesfull'})
    }else{
        res.status(500).json({msg : 'Incorrect Password'})
    }
    }catch(err){
        // console.log(' err msg -'+ err)
        if(err == "TypeError: Cannot read properties of undefined (reading 'passWord')"){
            console.log('ffffffffffffffffffff')
            res.status(400).json(err)
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