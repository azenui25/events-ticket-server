const { Router } = require('express')
const router = new Router()

router.post('/risk', (req, res, next) => {
  let risk = 5
  const { numberOfAuthorsTickets, priceAverage, ticketPrice, hour, numberOfComments } = req.body
  const x = Math.round(100 * (1 - (ticketPrice / priceAverage)))
  const y = Math.round(100 * ((ticketPrice / priceAverage) - 1))

  if (numberOfAuthorsTickets == 1) {
    risk += 10
  }

  if (ticketPrice < priceAverage) {
    risk += x
  }

  if (ticketPrice > priceAverage) {
    if (y > 10) {
      risk -= 10
    } else {
      risk -= y
    }
  }

  if (hour) {
    if (hour < 9) {
      risk += 10
    } else if (hour > 17) {
      risk += 10
    } else {
      risk -= 10
    }
  }
  if (numberOfComments > 3) {
    risk += 5
  }

  if (risk > 95) {
    risk = 95
  }

  if (risk < 5) {
    risk = 5
  }
  
  else {
    risk
  }

  res.json(risk)
})
module.exports = router