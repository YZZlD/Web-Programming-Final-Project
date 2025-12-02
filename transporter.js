const nodemailer = require('nodemailer');
require('dotenv').config();

nodemailer.createTestAccount((err, account) => {
    if(err) console.error('Failed to create a testing account. ' + err.message);
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter;