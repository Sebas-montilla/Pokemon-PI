const { Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

xdescribe('Type model', () => {
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      }));
    
})