import request from 'request';

const sendEmail = async (to, obj, msg) => {
  const options = {
    method: 'POST',
    url: `${process.env.MAILING_SERVER}/sendEmail`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: 'false',
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
      from: `Assessment-Manager<${process.env.SMTP_FROM}>`,
      to,
      subject: 'Verify OTP - Workcamp',
      text: msg,
      html: `Hi ${obj.name}, Please verify your account using OTP: ${obj.otp}. It will expires in an hour.`,
    }),
  };
  request(options, (error, response) => {
    if (error) {
      return error;
    }
    return response;
  });
};

export default sendEmail;
