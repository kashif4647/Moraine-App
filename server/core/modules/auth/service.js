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

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  const User = await UserRepo.createUser({ ...user });

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

async function updateApplicationStatus(id, payload) {
  const app = await ApplicationRepo.updateApplication(
    { 'requests._id': id },
    { $set: { 'requests.$.status': payload.status } }
  );

  if (!app) throw new Error('Something went wrong!');

  return {
    response: app,
    message: 'Application status updated successfully!',
  };
}

async function updateProgramStatus(id, payload) {
  const app = await ApplicationRepo.updateApplication(
    { _id: id },
    { $set: { 'program.status': payload.status } }
  );

  if (!app) throw new Error('Something went wrong!');

  return {
    response: app,
    message:
      'Program status updated successfully and email sent to the student!',
  };
}

async function selectProgram(payload) {
  const stdApp = await ApplicationRepo.fetchOneApplication({
    studentRef: payload.studentRef,
  });

  if (stdApp) {
    const { _id } = stdApp;
    const proUpdate = await ApplicationRepo.updateApplication(
      { _id },
      { $set: { program: { name: payload.name } } }
    );

    return {
      response: proUpdate,
      message: 'Program added successfully!',
    };
  }

  const app = await ApplicationRepo.createApplication({
    program: { name: payload.name },
  });

  if (!app) throw new Error('Something went wrong!');

  return {
    response: app,
    message: 'Your program added successfully!',
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

async function sendEmailToStudent(email, payload) {
  const app = await mail(email, payload, 'Student notification');
  return {
    response: app,
    message: 'Meeting scheduled successfully!',
  };
}

export default {
  createUser,
  userLogin,
  createApplication,
  fetchApplication,
  fetchApplicationByID,
  sendEmailToStudent,
  updateApplicationStatus,
  selectProgram,
  updateProgramStatus,
};
