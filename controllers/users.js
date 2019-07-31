const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Event = require('../models/events');


//index route for all users
router.get('/', async (req, res)=>{
    // if(admin){
    try{
        const allUsers = await User.find();
        res.render('users/index.ejs', {
            users: allUsers
        })
    } 
    catch(err){
        console.log(err, "<---error in user index route");
        res.send(err);
    }
    //} else {
    //     req.session.message = "Please login as admin to access all users."
    //     res.redirect('/users/login.ejs')
    // }
});

//new route to form to register new user
router.get("/new", async (req, res)=>{
    if(req.session.userID){
        console.log("in new controler", req.session);
        console.log("in new controler", res.locals);
        try{
            res.render('users/new.ejs');
        } catch(err){
            console.log(err, "<----error in user new route");
            res.send(err);
        }
    } else {
        // ***ALERT***
        req.session.message = "You are currently logged in.";
        res.redirect('/users/login');
    }
});

router.get('/login', async (req, res)=>{
    console.log("in login route");
    try{
        res.render('users/login.ejs');
    } 
    catch(err){
        console.log(err);
        res.send(err);
    }
})

router.get('/login', async (req, res)=>{
    try{
        res.render('users/login.ejs');
    } catch(err){
        console.log(err, "in get /users/login route");
        res.send(err);
    }
})

//login route, handles login request coming from home page
router.post('/login', async (req, res)=>{
    try{
        const foundUser = await User.findOne({email:req.body.email});
        console.log(foundUser, "<---found user in login route.");
        req.session.userId = foundUser._id;
        if(foundUser){
            console.log(bcrypt.compareSync(req.body.password, foundUser.password), "<---compareSync in login")
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.userId = foundUser._id;
            } else {
                req.session.message = "Incorrect username or password."
            }
        } else {
            req.session.message = "Incorrect username or password."
        }
        res.redirect('/events/');
    } catch(err){
        console.log(err, "<----error in user login route");
        res.send(err);
    }
});

//show route for a user
router.get('/:id', async (req, res)=>{

    try{
        const user = await User.findById(req.params.id).populate("event");
        if(req.params.id===req.session.userId && user){
        
        console.log(user, "<----user in show route, event populated")
        const eventsBeingHosted = await Event.find({host: user._id})
        console.log(eventsBeingHosted, "<----events hosted by user in show route, host NOT populated")
        res.render('users/show.ejs', {
            user: user,
            events: eventsBeingHosted
        });
        } else{
            //***ALERT***/
            req.session.message = "You do not have required credentials for this page"
            console.log(req.session.message, "alert message","page redirected due to credentials")
            res.redirect('/events/');
        }
    }catch(err){
            console.log(err, "<---error in user show route");
            res.send(err);
    }
});

//edit route for user
router.get('/:id/edit', async (req, res)=>{
    if(req.session.userID){
        try{
            const user = await User.findById(req.params.id).populate('event');
            console.log(user, "<---user in edit route, event populated");
            const eventsBeingHosted = await Event.find({host: user._id});
            console.log(eventsBeingHosted, '<---events hosted by user in edit route, host NOT populated');
            res.render('users/edit.ejs', {
                user: user,
                event: eventsBeingHosted
            })
        } catch(err){
            console.log(err, "<--error in user edit route");
            res.send(err);
        }
    // change to login page
    } else {
        req.session.message = "Please login."
        res.redirect('/users/new')
    }       
})

//put route to update user
router.put('/:id', async (req, res)=>{
    if(req.session.userID){
        // if(admin){
            try{
                const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
                res.redirect('/users/')
            } catch(err){
                console.log(err, "<---error in user put route");
                res.send(err);
            }
        // } else {
        //     req.session.message = "Access denied."
        // }
    } else {
        req.session.message = "Please login."
    }
});

//post route to create new registered user
router.post('/', async (req, res)=>{
    try{
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password);
        console.log(hashedPassword, "<---hashed Password in post route.");
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        console.log(newUser, "<---new user in post route.")
        req.session.userId = newUser._id;
        res.redirect('/events/');
    } 
    catch(err){
        if(err.code == 11000){
            // ***ALERT***
            req.session.message = "Email registered by another user. Please use a different email to register.";
        };
        console.log(err, "<----error in user post route");
        console.log(req.session.message);
        res.redirect('/users/new')
    }
});

router.delete('/:id', async (req, res)=>{
    if(admin){
        try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.redirect('/users/')
        }
        catch(err){
        console.log(err);
        res.send(err);
        }
    // change as needed
    } else {
        res.redirect('/users/new')
    }
});



module.exports = router;



