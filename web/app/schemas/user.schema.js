var schemaHelper = require('./schema-helper');

module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    uuid: {
      type: 'string',
      pattern: /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-‌​fA-F]{12}(\}){0,1}$/
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    username: {
      type: 'string',
      minLength: 8,
      maxLength: 12
    },
    email: {
      type: 'string',
      pattern: 'email'
    },
    birthDate: {
      type: schemaHelper.constructors.Moment
    },
    tags: {
      type: 'array'
    }
  }
};
