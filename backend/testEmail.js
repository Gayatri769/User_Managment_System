import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function testSend() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Test email',
    text: 'Hello from nodemailer test',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Test email sent!');
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

testSend();
