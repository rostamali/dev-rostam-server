const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const cors = require('cors');
app.use(cors());
app.use(express.json());

require('dotenv').config();

/* node mailer */
const nodemailer = require("nodemailer");


app.post('/contact', (req, res) => {

    const contactInfo = req.body;
    
    const messageOutput = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
    
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&display=swap');
            body{
                font-family: 'Poppins', sans-serif;
            }
            h1,h4,p{
                padding: 0;
                margin: 0;
            }
            .email__body h1 {
                text-align: center;
                font-size: 20px;
                font-weight: 500;
                padding: 40px 10px;
            }
            h4.user__name{
                text-transform: capitalize;
            }
            h4.user__name,
            h4.user__email {
                font-size: 16px;
                font-weight: 400;
                margin-bottom: 15px;
            }
            p.user__message {
                color: #383838;
                font-size: 15px;
                letter-spacing: 0.28px;
                line-height: 28px;
            }
        </style>
    
    </head>
    <body>
        
        <div class="email__body">
            <h1>Contact Form Message</h1>
            <h4 class="user__name">User name: ${contactInfo.yourName}</h4>
            <h4 class="user__email">User email: ${contactInfo.yourEmail}</h4>
            <h4 class="user__email">Message:</h4>
            <p class="user__message">${contactInfo.yourMessage}</p>
        </div>
    
    </body>
    </html>
    `

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: `${process.env.EMAIL_ACCOUNT}`,
            pass: `${process.env.EMAIL_PASS}`,
        },
        tls:{
            rejectUnauthorized: false
        }
    });
    var message = {
        from: `${process.env.EMAIL_ACCOUNT}`,
        to: `${process.env.RECEVIED_EMAIL}`,
        subject: "New Message From Portfolio",
        text: "Plaintext version of the message",
        html: messageOutput
    };
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            res.send(error) 
            return console.log(error)
        }else{
            res.send(info)   
        }
    });
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})