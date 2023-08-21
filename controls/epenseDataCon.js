const expenseData =  require('../models/expenseData');

const bodyParser= require('body-parser')


exports.creatingExpense =  async(req, res)=>{
    try{
        const userId = req.user.id
        // const userId = req.user.createExpenseData
        console.log('req.user>>>>'+(userId))
        // const userId = req.user.id
        const{expense,description,category}=req.body

        let data = await expenseData.create({
            expense : expense,
            description : description,
            category : category,
            sinupId:userId
        })

        let user = req.user

        res.status(201).json({ userdetails : data,user : user})

    }catch(err){console.log(err)}
}

exports.gettinAllData = async(req, res)=>{
    try{
        console.log('here')
        const userId = req.user.id
        console.log('userId ...'+ userId)
   
        let data = await expenseData.findAll({where:{sinupId : userId}})
        // console.log(data)
        // res.locals.user = req.user
        let user = req.user
        res.status(201).json({ userdetails: data , user : user})

    }catch(err){console.log(err)}
}

exports.deleteData = async(req,res)=>{
    try{
        let deleteId = req.params.id;
        let data = await expenseData.destroy({where : {id :(+deleteId)}})
        // console.log('deleteId')
        res.status(201).json({ userdetails: data })
        // res.redirect('/user/get-data')
    }catch(err){console.log(err)}
}

exports.editingData = async(req,res)=>{
    try{
        let dataId = req.params.id;
        // let data = await ExpenseData.findById((+dataId))
        let data = await expenseData.findAll({where : {id : (+dataId)}})
        res.status(201).json({userdetails:data})

    }catch(err){console.log(err)}
}

exports.updateData = async(req,res)=>{
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
}