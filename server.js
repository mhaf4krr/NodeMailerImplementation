const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const  app = express();

app.set('view engine','ejs')

const urlencodedParser = bodyParser.urlencoded({extended:true})
/* TO use it with GMAIL or Yahoo you need to enable less secure apps first for them to work as intended */
/* Yahoo is very Slow but Gmail is fast */

app.get('/mail',(req,res)=>{
    res.render('form')
})

app.post('/sendEmail',urlencodedParser,(req,res)=>{

    console.log(req.body)

    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "hyderdevelops@yahoo.com", // generated ethereal user
            pass: "mcgqQtPG3Zp339W" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"JS Developer" <hyderdevelops@yahoo.com', // sender address
        to: `${req.body.receiverEmail}`, // list of receivers
        subject: 'Mail from NodeMailer ✔', // Subject line
        text: `${req.body.message}`, // plain text body
        html: `<p>${req.body.message}</p>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send('Success')

        
    });
    
});

app.listen(3000,()=>{
    console.log('Server started')
})