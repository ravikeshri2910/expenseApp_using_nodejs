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
        
        const tExpense = req.user.totalExpense + +expense
        console.log('totalexpense '+tExpense)

        await req.user.update({totalExpense : tExpense})

        // await req.user.update({totalExpense : tExpense})

        res.status(201).json({ userdetails : data, user : user})

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
        let field = await expenseData.findByPk(deleteId)

        const tExpense = req.user.totalExpense - +(field.expense)
        console.log('totalexpense '+ tExpense)

        await req.user.update({totalExpense : tExpense})

        // console.log(req.user)
        let data = await expenseData.destroy({where : {id :(+deleteId)}})


        console.log(field)
        res.status(201).json({ userdetails: field })
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

        console.log(req.user)
    
        // console.log(updatecatagory)
    
    
        let updatedData  = await expenseData.findAll({where : { id : (+dataId)}})
        
        console.log(updatedData[0].expense)

        let value = +(updatedData[0].expense) - +(updatedExpense) 

        const tExpense = req.user.totalExpense - +(value)
        console.log('totalexpense '+ tExpense)

        await req.user.update({totalExpense : tExpense})
    
       
        updatedData[0].expense = updatedExpense,
        updatedData[0].description = updatedDescription,
        updatedData[0].category = updatecatagory
        
        await updatedData[0].save()
    
        res.status(201).json({msg:'Updated'})
    
    }catch(err){console.log(err)}
}