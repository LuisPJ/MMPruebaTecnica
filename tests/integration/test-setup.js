const { server } = require('../../src/index');

module.exports = {
  closeServer: async () => {
    await new Promise(resolve => server.close(resolve));
  }
};