const Sequelize = require("sequelize");
const db = require("../db");
const Event = require('../event/model')
const Comment = require('../comment/model')

const Ticket = db.define("ticket", {
   
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        field: 'Name'
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'Price'
    },

    time: {
        type: Sequelize.STRING,
        defaultValue: new Date().getHours()
      },

    description: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'Description'
    },

    risk:{
        type: Sequelize.INTEGER,
        defaultValue: 5
      }

});


Ticket.hasMany(Comment)
Comment.belongsTo(Ticket)

module.exports = Ticket