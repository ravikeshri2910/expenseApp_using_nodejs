const express = require('express');
const passwordCon = require('../controls/passwordCon')
const authorization = require('../middleWare/auth')

const router = express.Router();

router.post('/forgotpassword',passwordCon.forgetPassword)

module.exports = router;