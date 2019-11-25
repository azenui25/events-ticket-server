const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
    name:{
        type: Sequelize.STRING,
        field: 'Name'
    },
    description: {
        type: Sequelize.STRING,
        field: 'Description'
    },
    logo: {
        type: Sequelize.STRING,
        field: 'Logo'
    },
    date:{
        type: Sequelize.STRING,
        field: 'Date'
    },

});

module.exports = Event