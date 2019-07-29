const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

require('./db/db');
const eventsController = require("./controllers/events");
const usersController = require("./controllers/users");

app.use(session({
  secret: 'This is a random secret string',
  resave: false, //we only save the cookie when we mutate it.
  saveUninitialized: false //don't save the cookie until the user has logged in
  //legally, you're not supposed to track user data until the user has logged in
  //which is why you're asked to accept that a site will use cookies
}));
app.use((req, res, next)=>{
    res.locals.currentUser = req.session.userId;
    res.locals.message = null;
    if(req.session.message){
        console.log("message is set: ", req.session.message)
        res.locals.message = req.session.message;
        req.session.message = null;
        console.log('res.locals: ', res.locals);
    }
next();
}); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use('/events', eventsController);
app.use('/users', usersController);



app.get('/', (req, res)=>{
    res.render('home/index.ejs')
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})