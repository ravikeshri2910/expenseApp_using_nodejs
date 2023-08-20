const sinUp = require('../models/userSinup');


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.sinUpRoute = async (req, res, next) => {

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


}


function generateWebToken(id){
    return jwt.sign({userId : id},'849448481huhfwufheuyh15418549874ewjhbdweudbweub')
 }

exports.loginRoute = async (req, res) => {
    try {
        const logInemail = req.body.email
        const logInPassword = req.body.password

        const user = await sinUp.findAll({ where: { email: logInemail } })

        console.log('id+'+user[0].id)
        
        bcrypt.compare(logInPassword,user[0].passWord,(err, result)=>{
            if(err){
                res.status(500).json({ msg: 'Something is wrong' })
            }
            if(result==true){
                res.status(201).json({ userdetails: user, token : generateWebToken(user[0].id) })
            }else{
                res.status(401).json({ msg: 'Incorrect Password' }) 
            }
        })

    } catch (err) {
        // console.log(' err msg -'+ err)
        if (err == "TypeError: Cannot read properties of undefined (reading 'passWord')") {

            res.status(404).json(err)
        }
    }
}