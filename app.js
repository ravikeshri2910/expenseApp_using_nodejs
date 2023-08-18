const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')// for encryption of password

const sequelize = require('./utill/database');
const sinUp = require('./models/userSinup')


const app = express();
app.use(cors());
app.use(bodyParser.json());

//sinup data
app.post('/user/expense-sinup-data', async (req, res, next) => {

    try {
        console.log('here')

        const name = req.body.name;
        const email = req.body.email;
        const passWord = req.body.password;

        // encryption
        const saltrounds = 10;
        bcrypt.hash(passWord, saltrounds, async (err, hash) => {
            console.log(err)
            await sinUp.create({
                name: name,
                email: email,
                passWord: hash
            })
            res.status(201).json({ msg: 'Regitered' })
        })


    } catch (err) {
        // console.error("error 66" + err);
        if (err == 'SequelizeUniqueConstraintError: Validation error') {

            res.status(400).json(err);
        }
    }


})

// login 
app.post('/user/expense-login-data', async (req, res) => {
    try {
        const logInemail = req.body.email
        const logInPassword = req.body.password

        const user = await sinUp.findAll({ where: { email: logInemail } })

        // console.log(user[0].passWord)
        let flag;

        bcrypt.compare(logInPassword,user[0].passWord,(err, result)=>{
            if(err){
                res.status(500).json({ msg: 'Something is wrong' })
            }
            if(result==true){
                res.status(201).json({ msg: 'Login Succesfull' })
            }else{
                res.status(401).json({ msg: 'Incorrect Password' }) 
            }
        })

        // if (flag) {
        //     res.status(201).json({ msg: 'Login Succesfull' })
        // } else {
        //     res.status(401).json({ msg: 'Incorrect Password' })
        // }
    } catch (err) {
        // console.log(' err msg -'+ err)
        if (err == "TypeError: Cannot read properties of undefined (reading 'passWord')") {

            res.status(404).json(err)
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