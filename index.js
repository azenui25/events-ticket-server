const express = require('express')

//db
const db = require('./db')

// init
const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server is listening on ${port}!`))
app.get('/test', (req, res) => res.send('hello world'))