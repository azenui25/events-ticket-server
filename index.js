const express = require('express')

//middleware
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserMiddleWare = bodyParser.json()
const corsMiddleWAre = cors()
const authMiddleware = require('./auth/middleware')




//db
const db = require('./db')

//models
const Event = require('./event/model')
const Ticket = require('./ticket/model')





//router
const eventRouter = require('./event/router')
const userRouter = require('./user/router')
const authRouter = require('./auth/router')
const ticketRouter = require('./ticket/router')

// init
const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server is listening on ${port}!`))
app.get('/test', (req, res) => res.send('hello world'))



const loggingMiddleWare = (req, res, next) => {
    console.log("I am a middleware", Date.now());
    next(); // everything is ok -> next()
};

app
    // .use(authMiddleware)
    .use(loggingMiddleWare)
    .use(corsMiddleWAre)
    .use(bodyParserMiddleWare)
    .use(userRouter)
    .use(authRouter)
    .use(eventRouter)
    .use(ticketRouter)





db.sync({ force: true })
    .then(() => {
        console.log("Database schema has been updated.")

        const event1 = Event.create({ name: 'GeoMundus', description: 'GeoMundus is a free international Conference organized by students for students', logo: 'http://www.geomundus.org/2019/images/logogm_11.png', date: '29th and 30th November 2019' })
        const event2 = Event.create({ name: 'Esri User Conference', description: 'Enjoy immersive learning, hands-on training, collaboration, networking, and fun.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Esri_Headquarters%2C_Building_Q.jpg/220px-Esri_Headquarters%2C_Building_Q.jpg', date: '20th to 23th December 2019' })
        const event3 = Event.create({ name: 'GeoBuiz Summit 2020', description: 'GeoBuiz Summit is a two days Geospatial business conference of IT and geospatial industry stalwarts, facing the rising tide of innovation, addressing a broad array of issues impacting businesses, innovation and governance dynamics.', logo: 'https://geobuiz.com/summit-2020/images/bim-image.jpg', date: '2nd and 3rd February 2020' })
        const event4 = Event.create({ name: 'Web Summit', description: 'Web Summit is an annual technology conference held in Lisbon, Portugal, considered the largest tech event in the world', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/06-11-2017_WebSummit_Pra%C3%A7a_do_Com%C3%A9rcio_Lisboa_%28cropped%29.png/1024px-06-11-2017_WebSummit_Pra%C3%A7a_do_Com%C3%A9rcio_Lisboa_%28cropped%29.png', date: '1st to 3rd March 2020' })
        return Promise.all([event1, event2, event3, event4])

    })


    .then(() => {
        const tickets = [
          {  name:'Full conference', price: 'EUR 1000', description: 'Get  access to all the events of the conference', eventId: 1},
          {  name:'Full conference', price: 'EUR 1200', description: 'Get  access to all the events of the conference', eventId: 2},
          {  name:'Full conference', price: 'EUR 1500', description: 'Get  access to all the events of the conference', eventId: 3},
          {  name:'Full conference', price: 'EUR 2000', description: 'Get  access to all the events of the conference', eventId: 4},
          {  name:'Workshop', price: 'EUR 200', description: 'Attend a three hour workshop of your choice', eventId: 1},
          {  name:'Keynote session', price: 'EUR 300', description: 'Access the keynote session and listen u experienced keynote speakers', eventId: 1},
          {  name:'Gala', price: 'EUR 200', description: 'Attend the gala and meet new people.', eventId: 1},
          {  name:'ArcGIS workshop', price: 'EUR 400', description: 'Access the training workshop on the use of ESRI products', eventId: 2},
          {  name:'Career session', price: 'EUR 400', description: 'Get insights of the possible career paths in the information management industry', eventId: 2},
          {  name:'Poster presentation', price: 'EUR 200', description: 'View the works of some GIS professionals', eventId: 2},
          {  name:'Business Geo', price: 'EUR 500', description: 'Access the business session where business ideas in Geo Information are presented and analysed', eventId: 3},
          {  name:'Real projects', price: 'EUR 500', description: 'View the presentation of real world projects', eventId: 3},
          {  name:'Training', price: 'EUR 500', description: 'Get first hand training with certification', eventId: 3},
          {  name:'Contest', price: 'EUR 200', description: 'Take part in the contest to win amazing prices', eventId: 4},
          {  name:'The WEB', price: 'EUR 800', description: 'Get to know the various technologies and plat forms in the web development world', eventId: 4},
          {  name:'Presentation', price: 'EUR 700', description: 'Access the presentation of projects from developers', eventId: 4}
        ]
 
    const ticketPromises = tickets.map(ticket => Ticket.create(ticket));
    return Promise.all(ticketPromises);

    })

    

    .catch(console.error)