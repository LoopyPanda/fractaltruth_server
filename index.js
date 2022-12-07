const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
//const { google } = require("googleapis");
//const OAuth2 = google.auth.OAuth2;
const app = express();

app.use(cors());
require("dotenv").config();
/*
const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENTID, // ClientID
    process.env.OAUTH_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken()
*/

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
        accessToken: process.env.OAUTH_ACCESS_TOKEN,
    },
    tls: {
        rejectUnauthorized: false
    },

});
console.log(process.env.OAUTH_CLIENTID);


transporter.verify((err, success) => {
    err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
});

//create mailOption(serverside)

let mailOptions = {
    from: "test@gmail.com", // sender email
    to: "satyad18@gmail.com", // receiver email
    subject: "Keep in Touch",
    text: "Hello, Welcome to Fractal World !!",
};


const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.post('/contact', () => {
    //send the mailOptions through a transporter sendMail method
    console.log('post');
    transporter.sendMail(mailOptions, function (err, data) {

        console.log(mailOptions);
        if (err) {
            console.log("Error " + err.message);
        } else {
            console.log("Email sent successfully");
        }
    });
})