const nodemailer = require('nodemailer');
const path = require('path')

exports.sendEmail = (recipient, message) => {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: "ashoksahu1105@gmail.com",
      pass: "ashok$1111",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const data = {
    from: `Bakerywala.com <${process.env.NODEMAILER_SENDER_MAIL}>`,
    to: recipient,
    subject: `${message.subject}`,
    text: `${message.text}`,
    html: `${message.html}`,
    // attachments: [
    //     { filename: 'images/1.JPG', path: path.resolve(__dirname,'../images/1.jpg') } 
    // ],
  };

  transporter.sendMail(data, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};
