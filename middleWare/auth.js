// const jwt = require('jsonwebtoken');

// const sinUp = require('../models/userSinup');
const jwt = require('jsonwebtoken');
const sinUp = require('../models/userSinup');


exports.authenticateAddExpense = (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        // console.log(" >>>>>>>>"+token)

        const user = jwt.verify(token, '849448481huhfwufheuyh15418549874ewjhbdweudbweub');

        // console.log('user >>>>>'+user.userId)
        sinUp.findByPk(user.userId).then(user =>{
            req.user = user;
            // console.log('autothe')
            // console.log('user >>>>'+JSON.stringify(req.user));
            next();
        }).catch(err => {throw new Error(err)})
    }catch(err) {console.log(err)}
} 




module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log("Token >>>>>>>>", token);

        const user = jwt.verify(token, '849448481huhfwufheuyh15418549874ewjhbdweudbweub'); // Make sure the secret matches the one used for signing

        // console.log('User ID >>>>>', user.userId);
        try {
            const foundUser = await sinUp.findByPk(user.userId);
            if (foundUser) {
                req.user = foundUser;
                // console.log('Authenticated User:', JSON.stringify(req.user));
                next();
            } else {
                throw new Error('User not found');
            }
        } catch (err) {
            throw new Error(err);
        }
    } catch (err) {
        console.log(err);
    }
};
