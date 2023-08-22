

const Order = require('../models/order');
const Razorpay = require('razorpay')


exports.purchasepremium = async (req,res)=>{
    try{
        // console.log(req.user)
        const rzp = new Razorpay({
            key_id : 'rzp_test_06L1Sh8vBldjdz',
            key_secret : 'SYVwGsSvfxWeVFmhdW17xiOr'
        })
        const amount = 2500;

        rzp.orders.create({amount , currency : "INR"}, (err, order) => {
            console.log('order>>>>>>>>> '+JSON.stringify(order))
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({ // adding data in orders table
                orderid : order.id,
                status : 'Pending'
            }).then(()=>{
                return res.status(201).json({order,key_id : rzp.key_id})
            }).catch(err => {throw new Error (err)})
        }) 

    }catch(err){
        console.log(err)
        res.status(403).json({msg : 'Something wrong',error : err})
    }
}

exports.primiumUpdate = async(req,res)=>{
    try{
    const {order_id,payment_id} = req.body

    console.log("req.user")
    console.log(order_id,payment_id)
    // console.log(req.user)

    let data = await Order.findAll({where : {orderid : order_id}})
    console.log('data'+ JSON.stringify(data))
    

    data[0].paymentid = payment_id,
    data[0].status = 'Success',
 
    await data[0].save()

    let udata = await Order.findAll({where : {orderid : order_id}})
    console.log('udata'+ JSON.stringify(udata))

    await req.user.update({isPremium : true})

    res.status(201).json({message : 'payment done'})

    }catch(err){console.log(err)}
}

exports.failedprimiumUpdate = async (req,res)=>{
    try{

    const {order_id,payment_id} = req.body

    console.log("req.user3333")
    console.log(order_id,payment_id)

    let data = await Order.findAll({where : {orderid : order_id}})
    console.log('data'+ JSON.stringify(data))
    

    data[0].paymentid = payment_id,
    data[0].status = 'Failed',
 
    await data[0].save()

    await req.user.update({isPremium : false})

    res.status(201).json({message : "Payment failed"})

    }catch(err){console.log(err)}
}