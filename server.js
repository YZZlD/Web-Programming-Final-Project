const express = require('express');
const path = require('path');
const emailEmitter = require('./src/emailEmitter.js');
require('dotenv').config();


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Default path serving the bookings page.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html/bookings.html'));
});


app.post('/reservation', (req, res) => {
    const {email, departureDatetime, returnDatetime} = req.body;

    //Get the current date in a date format
    const now = new Date(Date.now());

    //Convert departure to a datetime and compare to current date time. If it is before the current datetime invalidate the booking and return failure page to user.
    if(!(new Date(departureDatetime) > now)) return res.sendFile(path.join(__dirname, 'public', 'html/invalidBooking.html'));

    //Same as above but only return if the datetime has been specified for the return date
    if(returnDatetime && !(new Date(returnDatetime) > now)) return res.sendFile(path.join(__dirname, 'public', 'html/invalidBooking.html'));

    //On success emit an email event for the email emitter to handle (email confirmation to user with information for the booking.)
    emailEmitter.emit("email", {email: email, departureDatetime: departureDatetime, returnDatetime: returnDatetime});

    //Return the successful booking page html
    res.sendFile(path.join(__dirname, 'public', 'html/validBooking.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
