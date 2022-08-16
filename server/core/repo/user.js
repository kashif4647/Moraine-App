/* eslint-disable comma-dangle */
import Repository from './index';
import { User } from '../db/models/index';

class UserRepo extends Repository {
  async createUser(obj) {
    const payload = {
      ...obj,
    };
    const response = await this.createRecord(payload);
    return response;
  }

  async fetchUser(params, options = {}) {
    const attributes = [
      'id',
      'email',
      'password',
      'salt',
      'firstName',
      'lastName',
      'otp',
      'verified',
    ];
    const response = await this.findAllRecords({ params, attributes }, options);
    return response;
  }

  async updateUser(where, values, options) {
    const response = this.updateRecord(values, options);
    return response;
  }

  async fetchOneUser(params, options = {}) {
    const attributes = [
      'id',
      'email',
      'password',
      'salt',
      'firstName',
      'lastName',
      'otp',
      'verified',
    ];
    const response = await this.findOneRecord(
      { ...params, attributes },
      options
    );
    return response;
  }
}

export default new UserRepo(User);
