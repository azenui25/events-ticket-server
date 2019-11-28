const { Router } = require("express");
const User = require("./model");
const bcrypt = require('bcrypt')

const router = new Router();

router.post('/user', async (req, res, next) => {
  console.log("create user")
  try {
    const user = await User.create({
        email: req.body.email,
        password :  bcrypt.hashSync(req.body.password, 10)
    })

    res
      .status(201)
      .send(user)
      // .catch(err => next(err))
  } catch (error) {
    next(error)
  }

})

router.put('/users/:userId', (req, res) => {
  User.findByPk(req.params.userId)
      .then(user => {
          return user.update(req.body)
      })
      .then(updatedUser => {
          res.status(200).send(updatedUser)
      })
})

router.get('/users', (req, res) => {
  User.findAll()
      .then((users) => {
          res.status(200).json(users)
      })
})

module.exports = router
