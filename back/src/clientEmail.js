const nodemailer = require('nodemailer');

module.exports = {

    envEmail: (to, subject, text) => {

        let transporter = nodemailer.createTransport({
            service: 'gmail', // SMTP server address
            auth: {
                user: 'nexttalents2@gmail.com', // SMTP username
                // pass: 'muda aqzy mqim hoht'  // SMTP password
                pass: process.env.GMAIL_APP  // SMTP password
            },
        })

        let options = {
            // from: 'nexttalents2@gmail.com', // sender address
            // to: 'andrevgcosta02@gmail.com',   // list of receivers
            // subject: 'Hello World', // Subject line
            // text: 'Meu primeiro email com node', // plain text body
            // // html: ''  // html body

            from: 'nexttalents2@gmail.com', // sender address
            to: to,   // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            // html: ''  // html body
        }

        const sendEmail = async () => {
            try {
                console.log('Sending email...')
                let info = await transporter.sendMail(options)
                console.log('Email sent: ' + info.response)
            } catch (error) {
                console.error('Error sending email: ', error)
            }
        }
        sendEmail()
    }
    
}