const express = require('express');
const path = require('path');
const emailEmitter = require('./emailEmitter.js');
require('dotenv').config();


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html/bookings.html'));
});

app.post('/reservation', (req, res) => {
    const {email, departureDatetime, returnDatetime} = req.body;

    const now = new Date(Date.now());

    if(!(new Date(departureDatetime) > now)) return res.sendFile(path.join(__dirname, 'public', 'html/invalidBooking.html'));

    if(returnDatetime && !(new Date(returnDatetime) > now)) return res.sendFile(path.join(__dirname, 'public', 'html/invalidBooking.html'));

    emailEmitter.emit("email", {email: email, departureDatetime: departureDatetime, returnDatetime: returnDatetime});

    res.sendFile(path.join(__dirname, 'public', 'html/validBooking.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
