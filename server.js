const express = require('express');
const path = require('path');
const transport = require('./transporter.js');
const emailEmitter = require('./emailEmitter.js');
require('dotenv').config();


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html/bookings.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});