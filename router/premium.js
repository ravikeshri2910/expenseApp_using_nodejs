const express = require('express');
const premiumControl = require('../controls/premiumControl')
const authorization = require('../middleWare/auth')

const router = express.Router();

router.get('/leadBoardDetails',premiumControl.leadboardDetails)



module.exports= router;