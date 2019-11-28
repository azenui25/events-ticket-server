const { Router } = require("express");
const router = new Router();
const Event = require("./model");
// const Ticket = require('../ticket/model')
const auth = require('../auth/middleware')

router.get('/event',
  (req, res, next) => {
    Event.findAll()
      .then(events => res.send(events))
      .catch(next)
  })

router.get('/event/:id',
  (req, res, next) => {
    const eventId = req.params.id
    Event.findByPk(eventId)
      .then(event => res.send(event))
      .catch(next)
  })

router.post('/event', auth,
  (req, res, next) => {
    const event = {
      name: req.body.name,
      picture: req.body.picture,
      description: req.body.description,
      userId: req.body.user
    }
    Event.create(event)
      .then(event => res.send(event))
      .catch(next)
  })

router.delete("/event/:id", (req, res, next) => {
  // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)


  Event.destroy({
    where: {
      id: req.params.eventId
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

router.put("/event/:id", (req, res, next) => {
  // res.send('oh hi')
  // console.log(req.params, 'WRECKED BY PARAMS??')
  Event.findByPk(req.params.eventId)
    .then(event => {
      console.log("Event FOUND?", event);
      if (event) {
        event.update(req.body).then(event => res.json(event));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router;