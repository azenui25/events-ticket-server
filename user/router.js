const { Router } = require("express");
const User = require("./model");
const bcrypt = require('bcrypt')

const router = new Router();

router.post('/user', (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }

  if (user.email == null || user.password == null ||
    !user.email || !user.password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  } else {
    User.findOne({ where: { email: user.email } })
      .then(user1 => {
        if (!user1) {
          return User.create(user)
            .then(user2 =>
              res.status(200).json({
                id: user2.id,
                firstName: user2.firstName,
                email: user2.email
              }))
        } else {
          res.status(400).send({
            message: 'user exist'
          })
        }
      })
      .catch(next)
  }

})

module.exports = router