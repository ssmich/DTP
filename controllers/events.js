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
          events: foundEvents
        });
      }
    })
  
  });

router.get('/new', (req, res) => {
    res.render('events/new.ejs')
  });
  
  
//   router.get('/:id/edit', (req, res) => {
//     Event.findById(req.params.id, (err, foundEvent) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(foundEvent, "<---- edit route, document from mongodb")
//         res.render('Events/edit.ejs', {
//           Event: foundEvent
//         });
//       };
//     });
//   });
  
  router.get('/:id', (req, res) => {
  
    Event.findById(req.params.id,(err, retrievedEvent) => {
      if(err){
        res.send(err);
      } else {
        console.log(retrievedEvent, " <_-- put route response from db");
        res.render('events/show.ejs', {
          event: retrievedEvent
        });
      }
    })
  });
  
//   router.get('/:id', (req, res) => {
//     console.log(req.params, " params in the show route")
//     Event.findById(req.params.id, (err, foundEvent) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(foundEvent, ' <-- show route document from model');
//         res.render('Events/show.ejs', {
//           Event: foundEvent
//         });
//       };
//     });
//   });
  
//   router.delete('/:id', (req, res) => {
  
//     Event.findOneAndDelete(req.params.id, (err, response) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(response, " <--- Delete route")
//         res.redirect('/Events');
//       };
//     });
//   });
  
  
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
  
module.exports = router;