/* eslint-disable comma-dangle */
import Repository from './index';
import { Application } from '../db/models/index';

class ApplicationRepo extends Repository {
  async createApplication(obj) {
    const payload = {
      ...obj,
    };
    const response = await this.createRecord(payload);
    return response;
  }

  async fetchApplication(params, options = {}) {
    const attributes = ['subject', 'description', 'status'];
    const response = await this.findAllRecords({ params, attributes }, options);
    return response;
  }

  async updateApplication(where, options) {
    const response = this.updateRecord(where, options);
    return response;
  }

  async fetchOneApplication(params, options = {}) {
    const attributes = ['subject', 'description', 'status'];
    const response = await this.findOneRecord(
      { ...params, attributes },
      options
    );
    return response;
  }
}

export default new ApplicationRepo(Application);
