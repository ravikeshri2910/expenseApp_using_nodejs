const express = require('express');
const userControl = require('../controls/userControl')

const router = express.Router();

//sinup data
router.post('/expense-sinup-data', userControl.sinUpRoute)

// login 
router.post('/expense-login-data', userControl.loginRoute)





module.exports = router;