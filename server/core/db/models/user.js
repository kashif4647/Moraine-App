/* eslint-disable comma-dangle */
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    role: {
      type: String,
      enum: ['registrar', 'advisor', 'student'],
      default: 'student',
    },
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
