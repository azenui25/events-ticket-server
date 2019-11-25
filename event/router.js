const { Router } = require("express");
const router = new Router();
const Event = require("./model");

router.get("/events", (req, res, next) => {
  Event.findAll()
  .then(events => {
      res.send(events)
  })
  .catch(next)
})

router.get("/events/:eventId", (req, res, next) => {
  Event.findByPk(req.params.eventId, { include: [Ticket] })
    .then(event => {
      res.send(event);
    })
    .catch(next);
});


// Create a new event account
router.post("/events" , (req, res, next) => {
  console.log("Do we have the user of this request?", req.user);
  

  // const userId = req.body.userId // NO!
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(next);
});

router.delete("/events/:eventId", (req, res, next) => {
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

router.put("/events/:eventId", (req, res, next) => {
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