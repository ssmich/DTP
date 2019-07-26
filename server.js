const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

require('./db/db');
const eventsController = require("./controllers/events");
// const usersController = require("./controllers/users");

//app.use(session);
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use('/events', eventsController);
// app.use('/users', usersController);

app.get('/', (req, res)=>{
    res.render('home/index.ejs', {
        message: req.session.message
    })
})

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})