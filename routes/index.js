

// creating couple of routes so we can keep those routes


const express = require('express');
const router = express.Router()

const actions = require('../methods/actions');

router.get('/', (req, res) => {
    res.send('Hello World');

})

router.get('/dashboard', (req, res) => {
    res.send('DashBoard');

})

//@desc Adding new user
//@route POST/adduser

router.post('/adduser',actions.addNew);

// for authentication

router.post('/authenticate',actions.authenticate);

router.get('/getinfo',actions.getinfo)


module.exports = router