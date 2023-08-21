const expenseData = require('../models/expenseData');
// const user = require('../models/userSinup')
const sinUp = require('../models/userSinup');


exports.leadboardDetails = async (req, res) => {
    console.log("leadboardDetails")


    let data = await expenseData.findAll()
    let user = await sinUp.findAll()


    let s = data.sort((a, b) => {
        if (a.sinupId < b.sinupId) return -1;
        if (a.sinupId > b.sinupId) return 1;
        return 0
    })
    // console.log(s)
  


    const tExpense = []
    let ex = 0
    let i = 0
    let j = 1
    while (i < s.length) {
        console.log('ist' + s[i].sinupId, s[i].expense)

        if (s[i].sinupId == j) {
            ex = ex + +s[i].expense
            console.log('2nd' + s[i].sinupId, s[i].expense, ex)
        }
        else {
            j++
            i--
            tExpense.push(ex)
            ex = 0
        }
        i++

    }
    tExpense.push(ex)
    res.status(201).json({ udata: tExpense, user : user })
    console.log(user)

}


// [
//     expensedata {
//       dataValues: {
//         id: 2,
//         expense: '100',
//         description: 'awaawaw',
//         category: 'Drama',
//         createdAt: 2023-08-20T10:42:26.000Z,
//         updatedAt: 2023-08-20T17:52:27.000Z,
//         sinupId: 1
//       },
//       _previousDataValues: {
//         id: 2,
//         expense: '100',
//         description: 'awaawaw',
//         category: 'Drama',
//         createdAt: 2023-08-20T10:42:26.000Z,
//         updatedAt: 2023-08-20T17:52:27.000Z,
//         sinupId: 1
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     },
//     expensedata {
//       dataValues: {
//         id: 3,
//         expense: '300',
//         description: 'awaawaw',
//         category: 'Drama',
//         createdAt: 2023-08-20T14:51:08.000Z,
//         updatedAt: 2023-08-20T14:51:08.000Z,
//         sinupId: 2
//       },
//       _previousDataValues: {
//         id: 3,
//         expense: '300',
//         description: 'awaawaw',
//         category: 'Drama',
//         createdAt: 2023-08-20T14:51:08.000Z,
//         updatedAt: 2023-08-20T14:51:08.000Z,
//         sinupId: 2
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     },
//     expensedata {
//       dataValues: {
//         id: 4,
//         expense: '300',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T14:51:15.000Z,
//         updatedAt: 2023-08-20T14:51:15.000Z,
//         sinupId: 2
//       },
//       _previousDataValues: {
//         id: 4,
//         expense: '300',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T14:51:15.000Z,
//         updatedAt: 2023-08-20T14:51:15.000Z,
//         sinupId: 2
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     },
//     expensedata {
//       dataValues: {
//         id: 5,
//         expense: '100',
//         description: 'fdfdfdfd',
//         category: 'Action',
//         createdAt: 2023-08-20T17:47:45.000Z,
//         updatedAt: 2023-08-20T17:57:14.000Z,
//         sinupId: 1
//       },
//       _previousDataValues: {
//         id: 5,
//         expense: '100',
//         description: 'fdfdfdfd',
//         category: 'Action',
//         createdAt: 2023-08-20T17:47:45.000Z,
//         updatedAt: 2023-08-20T17:57:14.000Z,
//         sinupId: 1
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     },
//     expensedata {
//       dataValues: {
//         id: 8,
//         expense: '100',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T17:49:28.000Z,
//         updatedAt: 2023-08-20T17:49:28.000Z,
//         sinupId: 3
//       },
//       _previousDataValues: {
//         id: 8,
//         expense: '100',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T17:49:28.000Z,
//         updatedAt: 2023-08-20T17:49:28.000Z,
//         sinupId: 3
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     },
//     expensedata {
//       dataValues: {
//         id: 9,
//         expense: '400',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T17:57:31.000Z,
//         updatedAt: 2023-08-20T17:57:31.000Z,
//         sinupId: 3
//       },
//       _previousDataValues: {
//         id: 9,
//         expense: '400',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T17:57:31.000Z,
//         updatedAt: 2023-08-20T17:57:31.000Z,
//         sinupId: 3
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     },
//     expensedata {
//       dataValues: {
//         id: 10,
//         expense: '100',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T19:10:56.000Z,
//         updatedAt: 2023-08-20T19:10:56.000Z,
//         sinupId: 1
//       },
//       _previousDataValues: {
//         id: 10,
//         expense: '100',
//         description: 'fdfdfdfd',
//         category: 'Horror',
//         createdAt: 2023-08-20T19:10:56.000Z,
//         updatedAt: 2023-08-20T19:10:56.000Z,
//         sinupId: 1
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         raw: true,
//         attributes: [Array]
//       },
//       isNewRecord: false
//     }
//   ]