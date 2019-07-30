const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Event = require('../models/events');

router.get('/', (req, res) => {
    Event.find({}, (err, foundEvents) => {
      if(err){
        res.send(err);
      } else {
        console.log(foundEvents)
        // we can make folders in our views
        // to seperate each resource
        res.render('events/index.ejs', {
          event: foundEvents
        });
      }
    })
  
  });
  router.get('/new', (req, res) => {
    if(req.session.userID){
      res.render('events/new.ejs');
    } else {
    /// ***ALERT***
//  res.render('users/login.ejs');
    req.session.message = "Please login to host a game."
    res.render('users/new.ejs');
    }
})
  router.get('/:id/edit', (req, res) => {
    // if(req.session.userID){
    Event.findById(req.params.id, (err, foundEvent) => {
      if(err){
        res.send(err);
      } else {
        console.log(foundEvent, "<---- edit route, document from mongodb")
        res.render('Events/edit.ejs', {
          event: foundEvent
        });
      };
    });
  // } else {
  //   // ***ALERT***
  //   res.render("/users/login");
  // }
});

  router.post('/:id', async (req,res)=>{
      try{
        console.log(req.session, 'this is the req.session')
        const foundEvent = await Event.findById(req.params.id);
        const foundUser = await User.findById(req.session.userId)
        foundUser.event = req.params.id
        req.session.message = "You've been added to game"
        console.log(foundUser);
        res.render('events/show.ejs', {
          message: req.session.message,
          event: foundEvent
        });
      }catch(err){
        res.send(err);
        console.log(err);
      }
    });
  
  router.get('/:id', (req, res) => {
    Event.findById(req.params.id,(err, foundEvent) => {
      if(err){ß
        res.send(err);
      } else {
        console.log(foundEvent, " <_-- put route response from db");
        res.render('events/show.ejs', {
          event: foundEvent
        });
      }
    })
  });

  router.post('/', (req, res) => {
    // req.body is the information from the form
    console.log(req.body, ' req.body in post route')
    console.log(req.session.userId, 'req.session.userId')
    req.body.host = req.session.userId;
    console.log(req.body.host, " req.body.host in post route")
    Event.create(req.body, (err, createdEvent) => {
      if(err){
        res.send(err);
      } else {
        console.log(createdEvent, ' < createdEvent in post route');
        res.redirect('/events')
      }
    });
  })
  
  router.put('/:id', (req, res) => {
    console.log(req.params, " params in the show route")
    Event.findByIdAndUpdate(req.params.id, req.body, (err, updatedEvent) => {
      if(err){
        res.send(err);
      } else {
        console.log(updatedEvent, ' <-- show route document from model');
        res.render('Events/show.ejs', {
          updatedEvent: updatedEvent
        });
      };
    });
  });
  
  router.delete('/:id', (req, res) => {
    Event.findOneAndDelete(req.params.id, (err, response) => {
      if(err){
        res.send(err);
      } else {
        console.log(response, " <--- Delete route")
        res.redirect('/Events');
      };
    });
  });
  
module.exports = router;