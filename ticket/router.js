const { Router } = require('express');
const Ticket = require('./model');
const Event = require('../event/model')
const auth = require('../auth/middleware')
const User = require('../user/model')

const router = new Router();

router.get('/ticket:id',
(req, res, next) => {
  Ticket.findAll({
    where: { eventId: req.params.id },
    include: [
      {
        model: User,
        attributes: ['userName']
      }
    ]
  })
    .then(tickets => res.send(tickets))
    .catch(next)
})

router.get('/ticket/:id',
(req, res, next) => {
  const ticketId = req.params.id
  Ticket.findByPk(ticketId,
    {
      include: [
        {
          model: User,
          attributes: ['userName']
        },
        {
          model: Event,
          attributes: ['name']
        }
      ]
    })
    .then(ticket => res.send(ticket))
    .catch(next)
})

router.post('/ticket', auth,
(req, res, next) => {
  const ticket = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    userId: req.user.id,
    eventId: req.body.eventId
  }
  console.log('TICKET', ticket)
  Ticket.create(ticket)
    .then(tickets => res.send(tickets))
    .catch(next)
})

router.put('/ticket/:id',
(req, res, next) => Ticket
  .findByPk(req.params.id)
  .then(ticket => ticket.update(req.body))
  .then(ticket => res.send(ticket))
  .catch(next)
)

module.exports = router