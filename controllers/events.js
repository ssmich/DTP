const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Events = require('../models/events');

router.get('/', async (req, res)=>{
    try{
        res.render('event')
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

module.exports = router;