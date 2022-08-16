/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserRepo from '../../repo/user';
import ApplicationRepo from '../../repo/application';

import mail from '../shared/utiles/smpt';

async function oneUser(filter) {
  return UserRepo.fetchOneUser(filter);
}

async function matchPassword(bodyPassword, dbPassword) {
  const match = await bcrypt.compare(bodyPassword, dbPassword);
  if (match) {
    return true;
  }
  return false;
}

async function createUser(user) {
  const exist = await oneUser({ email: user.email });
  if (exist) {
    throw new Error('user already exists');
  }
  user.otp = {
    code: Math.floor(100000 + Math.random() * 900000),
    expires: new Date(Date.now() + 3600000),
  };
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  const User = await UserRepo.createUser({ ...user });
  const obj = {
    name: user.firstName,
    otp: user.otp.code,
  };
  await mail(user.email, obj, 'User Email Verification');
  return { User, message: 'user created successfully' };
}

async function userLogin(email, password) {
  const dbUser = await oneUser({ email });

  if (!dbUser) {
    throw new Error('email or password invalid');
  }

  const compare = await matchPassword(password, dbUser.password);
  if (!compare) {
    throw new Error('email or password invalid');
  }
  const token = jwt.sign({ dbUser }, process.env.JWT);
  const user = dbUser;
  delete user.password;
  delete user.otp;
  return { user, token, message: 'user successfully login' };
}

async function fetchApplicationByID(id) {
  const app = await ApplicationRepo.fetchOneApplication({ studentRef: id });

  if (!app) throw new Error('Application not found!');

  return {
    response: app,
    message: 'Student application fetched!',
  };
}

async function createApplication(payload) {
  const stdApp = await ApplicationRepo.fetchOneApplication({
    studentRef: payload.studentRef,
  });

  if (stdApp) {
    const { _id } = stdApp;
    const appUpdate = await ApplicationRepo.updateApplication(
      { _id },
      { $push: { requests: payload.requests } }
    );

    return {
      response: appUpdate,
      message: 'Application added successfully!',
    };
  }

  const app = await ApplicationRepo.createApplication(payload);

  if (!app) throw new Error('Something went wrong!');

  return {
    response: app,
    message: 'Your application submitted successfully!',
  };
}

async function fetchApplication() {
  const app = await ApplicationRepo.fetchApplication({});

  if (!app) throw new Error('Something went wrong!');

  return {
    response: app,
    message: 'Your application submitted successfully!',
  };
}

export default {
  createUser,
  userLogin,
  createApplication,
  fetchApplication,
  fetchApplicationByID,
};
