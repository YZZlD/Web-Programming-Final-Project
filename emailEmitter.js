const EventEmitter = require('events');
const transporter = require('./transporter.js');

const emailEmitter = new EventEmitter();

emailEmitter.on('email', (data) => {
    //THIS NEEDS TO CHANGE TO A PROPER IMPLEMENTATION FOR EMAILING ORDER CONFIRMATION
    const customFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format with AM/PM
    });

    const text = data.returnDatetime ? `This is confirmation of your booking for a round trip flight. Departure at: ${customFormatter.format(new Date(data.departureDatetime))}. Return at: ${customFormatter.format(new Date(data.returnDatetime))}`
    : `This is a confirmation of your booking for a single flight. Departure at: ${customFormatter.format(new Date(data.departureDatetime))}.`;

    const emailOptions = {
        from: 'Angelina Botsford <angelina.botsford@ethereal.email>',
        to: `${data.email}`,
        subject: 'Airline booking confirmation',
        text: text
    };

    transporter.sendMail(emailOptions, (err, info) => {
        if(err) console.log('Error occured. ' + err.message);
    });
});

module.exports = emailEmitter;
