
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const jwt = require('jsonwebtoken');


exports.forgetPassword = async (req, res) => {

    try {

        const email = req.body.email

        const client = Sib.ApiClient.instance;

        var apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY 

        const tranEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: 'ravikeshri2910@gmail.com',
            name : 'Expense Traker'
        }

        const recevers = [{
            email: email
        }]

        await tranEmailApi.sendTransacEmail({
            sender,
            to: recevers,
            subject: `Otp verification`,
            textContent: `Otp is sent`,
            // htmlContent: `<h1>Otp</h1>`,
        })

        console.log('forgetPasss')


        console.log(email)
    } catch (err) { console.log(err) }
}