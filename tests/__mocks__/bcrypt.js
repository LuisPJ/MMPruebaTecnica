module.exports = {
    hashSync: jest.fn((pass) => `hashed_${pass}`),
    compare: jest.fn().mockResolvedValue(true)
};