const Sequelize = require('sequelize');
const db = require('../db')
const Event = require('../event/model')
const Ticket= require('../ticket/model')
const Comment= require('../comment/model')


const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    
  }

});

User.hasMany(Ticket);
Ticket.belongsTo(User);
User.hasMany(Event);
Event.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = User