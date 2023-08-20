const express = require('express');
const expenseDataCon = require('../controls/epenseDataCon')
const authorization = require('../middleWare/auth')

const router = express.Router();

// creating expense
router.post('/expense-data',authorization.authenticateAddExpense,expenseDataCon.creatingExpense)

//geting all data after login
router.get('/get-data',authorization.authenticateAddExpense, expenseDataCon.gettinAllData)

// deleting expense
router.get('/raat-data/:id', expenseDataCon.deleteData)

// editing expense
router.get('/edit-data/:id',expenseDataCon.editingData)

// updating data
router.post('/updated-data', expenseDataCon.updateData)



module.exports= router;