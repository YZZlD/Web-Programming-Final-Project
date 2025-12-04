const EventEmitter = require('events');
const transporter = require('./transporter.js');

const emailEmitter = new EventEmitter();

emailEmitter.on('email', (data) => {

    //Formatter from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    const customFormatter = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long"
    });

    //Check if there is a return date and format email string properly for a single/round trip from that.
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
