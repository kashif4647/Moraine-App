import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log('Database connected successfully!');
      console.log(`DB_URL: ${process.env.DB_URL}`);
    })
    .catch(err => {
      console.log(err.message);
    });
};

export default connect;
