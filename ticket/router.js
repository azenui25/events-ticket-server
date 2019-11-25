const { Router } = require('express');
const Ticket = require('./model');
const Event = require('../event/model')


const router = new Router();

router.get('/tickets', (req, res, next) => {
  Ticket.findAll()
    .then(tickets => {
      res.send(tickets);
    })
    .catch(next);
});

router.get('/tickets/:id', (req, res, next) => {
  Ticket.findByPk(req.params.id, { include: [ Event ] })
    .then(ticket => {
      res.send(ticket);
    })
    .catch(next);
});



// // Create a new Ticket
router.post("/tickets", (req, res, next) => {
  // console.log("WHAT IS REQ.BODY", req.body)
  Ticket.create(req.body)
    .then(ticket => res.json(ticket))
    .catch(next)
});

router.delete("/tickets/:ticketId", (req, res, next) => {
  // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
  // res.send('Some people want to watch the world burn') // -> route works

  Ticket.destroy({
    where: {
      id: req.params.ticketId,
    }
  })
  .then(numDeleted => {
    if (numDeleted) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
  .catch(next);
});

router.put("/tickets/:ticketId", (req, res, next) => {
  // res.send('oh hi')
  // console.log(req.params, 'WRECKED BY PARAMS??')
  Ticket.findByPk(req.params.ticketId)
    .then(ticket => {
      // console.log("Ticket FOUND?", Ticket)
      if (ticket) {
        ticket
          .update(req.body)
          .then(ticket => res.json(ticket));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});


module.exports = router;