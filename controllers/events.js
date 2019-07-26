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
//     Event.findById(req.params.id, (err, foundAuthor) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(foundAuthor, "<---- edit route, document from mongodb")
//         res.render('authors/edit.ejs', {
//           author: foundAuthor
//         });
//       };
//     });
//   });
  
//   router.put('/:id', (req, res) => {
  
//     Author.findByIdAndUpdate(req.params.id, req.body,(err, updateResponse) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(updateResponse, " <_-- put route response from db");
//         res.redirect('/authors/' + req.params.id);
//       }
//     })
//   })
  
//   router.get('/:id', (req, res) => {
//     console.log(req.params, " params in the show route")
//     Author.findById(req.params.id, (err, foundAuthor) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(foundAuthor, ' <-- show route document from model');
//         res.render('authors/show.ejs', {
//           author: foundAuthor
//         });
//       };
//     });
//   });
  
//   router.delete('/:id', (req, res) => {
  
//     Author.findOneAndDelete(req.params.id, (err, response) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(response, " <--- Delete route")
//         res.redirect('/authors');
//       };
//     });
//   });
  
  
  router.post('/', (req, res) => {
    // req.body is the information from the form
    console.log(req.body, ' req.body')
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