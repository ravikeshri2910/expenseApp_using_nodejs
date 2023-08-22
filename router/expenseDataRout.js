const express = require('express');
const expenseDataCon = require('../controls/epenseDataCon')
const authorization = require('../middleWare/auth')

const router = express.Router();

// creating expense
router.post('/expense-data',authorization.authenticateAddExpense,expenseDataCon.creatingExpense)

//geting all data after login
router.get('/get-data',authorization.authenticate, expenseDataCon.gettinAllData)

// deleting expense
router.get('/raat-data/:id',authorization.authenticate, expenseDataCon.deleteData)

// editing expense
router.get('/edit-data/:id',authorization.authenticate,expenseDataCon.editingData)

// updating data
router.post('/updated-data',authorization.authenticate, expenseDataCon.updateData)



module.exports= router;