const Sequelize = require("sequelize");
const db = require("../db");
const Event = require('../event/model')

const Ticket = db.define("ticket", {
    name:{
        type: Sequelize.STRING,
        field: 'Name'
    },
    price: {
        type: Sequelize.STRING,
        field: 'Price'
    },
    description: {
        type: Sequelize.STRING,
        field: 'Description'
    }

});



Ticket.belongsTo(Event)
Event.hasMany(Ticket)

module.exports = Ticket