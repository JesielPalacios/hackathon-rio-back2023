import nodemailer from 'nodemailer';
// import config from './config.js'
// import { config } from 'dotenv';
// config();
import 'dotenv/config';
import config from './config';

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport

export const transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  // port: 587,
  // secure: false, // true for 465, false for other ports
  // auth: {
  //   user: testAccount.user, // generated ethereal user
  //   pass: testAccount.pass, // generated ethereal password
  // },

  host: config.gmailHost,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: config.gmailUser, // generated gmail user. 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
    pass: config.gmailPassword, // generated gmail password. 'REPLACE-WITH-YOUR-GENERATED-PASSWORD',
  },
});

transporter.verify().then(() => {
  console.log('[nodemailer 📬]: Ready for send emails.');
});
