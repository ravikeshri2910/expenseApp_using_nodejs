const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')// for encryption of password

const sequelize = require('./utill/database');
const sinUp = require('./models/userSinup')
const expenseData = require('./models/expenseData');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// creating expense
app.post('/user/expense-data', async(req, res)=>{
    try{
        

        const{expense,description,category}=req.body

        let data = await expenseData.create({
            expense : expense,
            description : description,
            category : category
        })

        res.status(201).json({ userdetails : data})

    }catch(err){console.log(err)}
})

app.get('/user/get-data', async(req, res)=>{
    try{
        let data = await expenseData.findAll()
        res.status(201).json({ userdetails: data })

    }catch(err){console.log(err)}
})

// deleting expense
app.get('/user/raat-data/:id', async(req,res)=>{
    try{
        let deleteId = req.params.id;
        console.log(deleteId)
       await expenseData.destroy({where : {id :(+deleteId)}})
        res.redirect('/user/get-data')
    }catch(err){console.log(err)}
})

// editing expense

app.get('/user/edit-data/:id',async(req,res)=>{
    try{
        let dataId = req.params.id;
        // let data = await ExpenseData.findById((+dataId))
        let data = await expenseData.findAll({where : {id : (+dataId)}})
        res.status(201).json({userdetails:data})

    }catch(err){console.log(err)}
})

app.post('/user/updated-data', async(req,res)=>{
    try{
        let dataId = req.body.id;
        let updatedExpense = req.body.updatedExpense;
        let updatedDescription = req.body.updatedDescription;
        let updatecatagory = req.body.updatecatagory;
    
        console.log(updatecatagory)
    
    
        let updatedData  = await expenseData.findAll({where : { id : (+dataId)}})
        
        console.log(updatedData[0].id)
    
       
        updatedData[0].expense = updatedExpense,
        updatedData[0].description = updatedDescription,
        updatedData[0].category = updatecatagory
        
        await updatedData[0].save()
    
        res.status(201).json({msg:'Updated'})
    
    }catch(err){console.log(err)}
})


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