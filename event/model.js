const Sequelize = require("sequelize");
const db = require("../db");
const Ticket = require('../ticket/model')

const Event = db.define("event", {
    name:{
        type: Sequelize.STRING,
        field: 'Name'
    },

    description: {
        type: Sequelize.STRING,
        field: 'Description'
    },
    picture: {
        type: Sequelize.STRING,
        field: 'picture'
    },
   

});

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

module.exports = Event