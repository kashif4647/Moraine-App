import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sentOtp = async (to, object) => {
  try {
    const msg = {
      from: process.env.SMTP_FROM,
      to,
      subject: 'Verify OTP - workcamp',
      html: `Your verify otp is here:{${object}} its expires in hours minutes`,
    };
    await transporter.sendMail(msg);
    return true;
  } catch (err) {
    return false;
  }
};

const passwordResetEmail = async (to, object) => {
  try {
    const msg = {
      from: process.env.SMTP_FROM,
      to,
      subject: 'Password Reset - workcamp',
      html: `Your password reset otp is here:{${object}} its expires in hours`,
    };
    await transporter.sendMail(msg);
    return true;
  } catch (err) {
    return false;
  }
};

export { sentOtp, passwordResetEmail };
