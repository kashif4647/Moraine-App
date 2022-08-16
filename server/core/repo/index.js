/* eslint-disable arrow-parens */
class Repository {
  constructor(modelInstance) {
    this.modelInstance = modelInstance;
  }

  findRecord(where, attributes, options = {}) {
    let params = where;
    if (attributes) {
      params.attributes = attributes;
    }
    if (options.length > 0) {
      params = { ...params, ...options };
    }
    return this.modelInstance.findOne(params);
  }

  createRecord(value) {
    return this.modelInstance.create(value);
  }

  findAllRecords(where, attributes, options = {}, plain = false) {
    let params = where;
    if (attributes) {
      params.attributes = attributes;
    }
    if (options) {
      params = { ...params, ...options };
    }
    const instance = this.modelInstance
      .find(params)
      .populate('studentRef', '-password');
    return plain ? instance.map(el => el.get({ plain: true })) : instance;
  }

  findOneRecord(where, attributes, options = {}) {
    let params = where;
    if (attributes.length > 0) {
      params.attributes = attributes;
    }
    if (options) {
      params = { ...params, ...options };
    }
    return this.modelInstance.findOne(params);
  }

  findOneRecordWithPopulate(where, populate = {}) {
    return this.modelInstance
      .findOne(where)
      .populate(`${populate.pop1.pop}`, `${populate.pop1.skip}`)
      .populate(`${populate.pop2.pop}`, `${populate.pop2.skip}`);
  }

  updateRecord(where, values) {
    return new Promise((resolve, reject) => {
      this.modelInstance
        .findOneAndUpdate(where, values, { new: true })
        .then(valus => {
          resolve(valus);
        })
        .catch(err => reject(err));
    });
  }

  createBluckRecord(data) {
    return this.modelInstance.insertMany(data);
  }

  deleteRecord(whereObject, options) {
    const params = { whereObject, ...options };
    return this.modelInstance.destroy(params);
  }

  deleteAllRecords(where, options) {
    const params = { where, ...options };
    return this.modelInstance.destroy(params);
  }

  aggregate(params) {
    return this.modelInstance.aggregate(params);
  }
}

export default Repository;
