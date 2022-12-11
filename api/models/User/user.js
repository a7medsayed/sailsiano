/**
 * User/user.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    Id: { type: 'string', required: true, unique: true },
    UserName: { type: 'string', required: true, unique: true },
    Age: { type: 'number', required: true },
    Password: { type: 'string', required: true },
    Email: { type: 'string', required: true, unique: true },
    Role: { type: 'json', required: true }
  },

};

