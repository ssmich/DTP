const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Event = require('../models/events');

router.get('/', async (req, res) => {
    Event.find({}, (err, foundEvents) => {
      if(err){
        res.send(err);
      } else {
        console.log(foundEvents)
        // we can make folders in our views
        // to seperate each resource
        res.render('events/index.ejs', {
          events: foundEvents
        });
      }
    })
  
  });

router.get('/new', async (req, res) => {
    try{
      //why does this work!?!? Without the line below, error thrown when rendering events/new.ejs
      //error says "currentUserName is not defined."
      //With currentUserName commented out, just creating "user" below still works!?!?!
      const user = await User.findById(req.session.userId);
      if(req.session.userId){
        res.render('events/new.ejs', {
          // currentUserName: user.name
        });
      } else {
      /// ***ALERT***
      req.session.message = "Please login to host a game."
      res.redirect('/users/new');
      }
    } catch(err){
      console.log(err, "<--error in new events route");
      res.send(err);
    }    
});
  router.get('/:id/edit', async (req, res) => {
    try{
      if(!req.session.userId){
        req.session.message="Login to edit an event."
        res.redirect('/users/login')
      }
      const foundEvent = await Event.findById(req.params.id);
      if(req.session.userId == foundEvent.host._id.toString()){
        console.log(foundEvent, "<---- inside edit route, foundEvent");
        res.render('events/edit.ejs', {event: foundEvent});
      } 
      else {
        req.session.message = "Only the event host may edit this event.";
        res.redirect('/events/'+req.params.id);
      }
    } catch(err){
          console.log(err, "error in events edit route");
          res.send(err);
    }
});    

//post route to add event id to logged in user
router.post('/:id', async (req,res)=>{
      try{
        if(req.session.userId){
          console.log(req.session, 'this is the req.session')
          const foundEvent = await Event.findById(req.params.id);
          const foundUser = await User.findById(req.session.userId);
          foundUser.event = req.params.id;
          foundUser.save();
          req.session.message = "You have been added to the event."
          console.log(foundUser);
          res.redirect("/events/" + req.params.id);
      }
        else{
          req.session.message = "You must login to join a game."
          res.redirect('/users/login')
      }
    }catch(err){
        res.send(err);
        console.log(err);
      }
});
  
  router.get('/:id', async (req, res) => {
    try{
      const foundEvent = await Event.findById(req.params.id).populate('host');
      console.log(foundEvent, " <--- found event in show route");
      const foundUser = await User.findById(req.session.userId);
      console.log(foundUser, " <--- found user in show route");
      const foundPlayers = await User.find({event:req.params.id});
      console.log(foundPlayers, " <--- found players in show route");
      // console.log(foundUser._id.toString() == foundEvent.host._id.toString(), "<--foundUser._id == foundEvent._host.id")
      res.render('events/show.ejs', {
          event: foundEvent,
          user: foundUser,
          players: foundPlayers
        });
      } catch(err){
        console.log(err);
        res.send(err);
      }
  });

  //post route to create new event
  router.post('/', async (req, res) => {
    // req.body is the information from the form
    try{
      console.log(req.body, ' req.body in post route')
      console.log(req.session.userId, 'req.session.userId')
      req.body.host = req.session.userId;
      console.log(req.body.host, " req.body.host in post route")
      const createdEvent = await Event.create(req.body);
      createdEvent.populate('host');
      console.log(createdEvent, ' < createdEvent in post route');
      res.redirect('/events/' + createdEvent._id)
    } catch(err){
      console.log(err, "error in post route to make new game");
      res.send(err);
    }  
});

  
  router.put('/:id', (req, res) => {
    console.log(req.params, " params in the show route")
    Event.findByIdAndUpdate(req.params.id, req.body, (err, updatedEvent) => {
      if(err){
        res.send(err);
      } else {
        console.log(updatedEvent, ' <-- show route document from model');
        res.redirect('/events/'+req.params.id);  
      };
    });
  });
  
router.delete('/:id', async (req, res) => {
    try{
        console.log('in delete route');
        const foundEvent = await Event.findById(req.params.id).populate('host');
        const users = await User.find({event: req.params.id}).populate('event');
        if(req.session.userId == foundEvent.host._id.toString()){
            const deletedEvent = await foundEvent.remove();
            console.log(deletedEvent, "<----deletedEvent in delete route");
            req.session.message = "Event Deleted"
            users.forEach(function(user){
                user.event = null;
            });
            res.redirect('/events/');
        } 
        else {
            req.session.message = "Only the host may delete this event"
        }
        res.redirect('/events/' + req.params.id);
    } catch (err){
        console.log(err);
        res.send(err);
    }
});
  
module.exports = router;