const Sequelize = require("sequelize");
const db = require("../db");
const Ticket = require('../ticket/model')

const Event = db.define("event", {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        field: 'Name'
    },
    description: {
        type: Sequelize.STRING,
        field: 'Description'
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'Logo'
    },
    date:{
        type: Sequelize.STRING,
        field: 'Date'
    },

});

Event.hasMany(Ticket);
Ticket.belongsTo(Event);

module.exports = Event