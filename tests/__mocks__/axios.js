module.exports = {
    get: jest.fn(),
    post: jest.fn(),
    create: jest.fn(() => this),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
};