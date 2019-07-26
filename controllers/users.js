const express = require('express');
const router = express();
const User = require('../models/users');
const Events = require('../models/events');

router.get('/', async (req, res)=>{
    try{
        res.render('user')
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

