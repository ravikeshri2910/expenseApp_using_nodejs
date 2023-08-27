const expenseData =  require('../models/expenseData');

const sequelize = require('../utill/database');


exports.creatingExpense =  async(req, res)=>{
    const t = await sequelize.transaction()
    try{
        const userId = req.user.id
        // const userId = req.user.createExpenseData
        // console.log('req.user>>>>'+(userId))
        // const userId = req.user.id
        const{expense,description,category}=req.body

        let data = await expenseData.create({
            expense : expense,
            description : description,
            category : category,
            sinupId:userId
        },{transaction : t})

        let user = req.user
        
        const tExpense = req.user.totalExpense + +expense
        // console.log('totalexpense '+tExpense)
        await req.user.update({totalExpense : tExpense},{transaction:t})
        
        // await req.user.update({totalExpense : tExpense})
        await t.commit()
        
        res.status(201).json({ userdetails : data, user : user})

    }catch(err){
        await t.rollback()
        console.log(err)
    }
}

exports.gettinAllData = async(req, res)=>{
    try{
        // console.log('here')
        const userId = req.user.id
        const page = +req.params.page || 1
        const pageLimit = +req.params.pageLimit || 2
        // console.log('pageLimit ...'+ pageLimit)

        let limit = pageLimit;
        let offset = 0 + (page -1) * limit;
        let totalItem;
   
        let data = await expenseData.findAndCountAll({
            where:{sinupId : userId},
            offset : offset,
            limit : limit
        })

        totalItem = data.count
        // console.log(totalItem)
        // res.locals.user = req.user
        let user = req.user
        res.status(201).json({
             userdetails: data ,
              user : user,
              //pagiantion
              currentPage : page,
              hasNextPage : limit * page < totalItem,
              nextPage : page + 1,
              hasPeriviosPage : page > 1,
              previosPage : page -1 ,
              lastPage : Math.ceil(totalItem/limit)

            })

    }catch(err){console.log(err)}
}

exports.deleteData = async(req,res)=>{
    const t = await sequelize.transaction()
    try{
        let deleteId = req.params.id;
        let field = await expenseData.findByPk(deleteId)

        const tExpense = req.user.totalExpense - +(field.expense)
        // console.log('totalexpense '+ tExpense)

        await req.user.update({totalExpense : tExpense},{transaction:t})

        // console.log(req.user)
        let data = await expenseData.destroy({where : {id :(+deleteId)}},{transaction:t})


        // console.log(field)
        await t.commit()
        res.status(201).json({ userdetails: field })
        // res.redirect('/user/get-data')
    }catch(err){
        await t.rollback()
        console.log(err)
    }
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
    const t = await sequelize.transaction()
    try{
        let dataId = req.body.id;
        let updatedExpense = req.body.updatedExpense;
        let updatedDescription = req.body.updatedDescription;
        let updatecatagory = req.body.updatecatagory;

        // console.log(req.user)
    
        // console.log(updatecatagory)
    
    
        let updatedData  = await expenseData.findAll({where : { id : (+dataId)}})
        
        // console.log(updatedData[0].expense)

        let value = +(updatedExpense)- +(updatedData[0].expense)  

        const tExpense = req.user.totalExpense + +(value)
        // console.log('totalexpense '+ tExpense)

        await req.user.update({totalExpense : tExpense},{transaction:t})
    
       
        updatedData[0].expense = updatedExpense,
        updatedData[0].description = updatedDescription,
        updatedData[0].category = updatecatagory
        
        await updatedData[0].save({transaction:t})
        await t.commit()
        res.status(201).json({msg:'Updated'})
    
    }catch(err){
        await t.rollback()
        console.log(err)
    }
}