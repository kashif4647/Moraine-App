import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config();

sgMail.setApiKey(process.env.SENDGRID);

const sentOtp = async (to, object) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL,
      subject: 'Verify OTP - workcamp',
      html: `Your verify otp is here:{${object}} its expires in hours minutes`,
    };
    await sgMail.send(msg);
    return true;
  } catch (err) {
    return false;
  }
};

const passwordResetEmail = async (to, object) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL,
      subject: 'Password Reset - workcamp',
      html: `Your password reset otp is here:{${object}} its expires in hours`,
    };
    await sgMail.send(msg);
    return true;
  } catch (err) {
    return false;
  }
};

export { sentOtp, passwordResetEmail };
