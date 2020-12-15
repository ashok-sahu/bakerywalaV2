const nodemailer = require('nodemailer');
// const hbs = require("nodemailer-handlebars");

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

//   transporter.use(
//     "compile",
//     hbs({
//       viewEngine: "express-handlebars",
//       viewPath: './views/',
//     })
//   );

  const data = {
    from: `Bakerywala.com <${process.env.NODEMAILER_SENDER_MAIL}>`,
    to: recipient,
    subject: `${message.subject}`,
    text: `${message.text}`,
    html: `${message.html}`,
    // attachments: [
    //     { filename: 'images/profile.JPG', path: 'images/profile.JPG' } // TODO: replace it with your own image
    // ],
    // template: 'index',
    // context: {
    //     name: 'Accime Esterling'
    // }
  };

  transporter.sendMail(data, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
};
