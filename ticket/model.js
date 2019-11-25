const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = db.define("ticket", {
    author:{
        type: Sequelize.STRING,
        field: 'Author'
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

module.exports = Ticket