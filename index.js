const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();

// following this link --- https://dev.to/jlong4223/how-to-implement-email-functionality-with-node-js-react-js-nodemailer-and-oauth2-2h7m
//create trasporter(client side)
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

transporter.verify((err, success) => {
    err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
});

//create mailOption(serverside)

let mailOptions = {
    from: "mymail@gmail.com", // sender email
    to: process.env.EMAIL, // receiver email
    subject: "Nodemailer API",
    text: "Hi from your nodemailer API",
};

//send the mailOptions through a transporter sendMail method
transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log("Error " + err);
    } else {
        console.log("Email sent successfully");
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 