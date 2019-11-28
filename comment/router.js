const { Router } = require('express')
const router = new Router()
const Comment = require ('./model')
const User = require ('../user/model')
const auth = require('../auth/middleware')


router.get('/comment/:id',
  (req, res, next) => {
    Comment.findAll({
      where: { ticketId: req.params.id},
      include: [
        {
          model: User,
          attributes: ['userName']
        }
      ]
    })
      .then(comments => res.send(comments))
      .catch(next)
  })

router.post('/comment', auth,
  (req, res, next) => {
    const comment = {
      comment: req.body.comment,
      userId: req.body.user,
      ticketId: req.body.ticketId
    }
    Comment.create(comment)
      .then(comment => res.send(comment))
      .catch(next)
  })


module.exports = router