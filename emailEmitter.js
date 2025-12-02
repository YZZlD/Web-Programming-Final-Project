const EventEmitter = require('events');

const emailEmitter = new EventEmitter();

emailEmitter.on('email', (data) => {
    //THIS NEEDS TO CHANGE TO A PROPER IMPLEMENTATION FOR EMAILING ORDER CONFIRMATION
    console.log(data);
});

module.exports = emailEmitter;