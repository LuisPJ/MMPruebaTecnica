const request = require('supertest');
const app = require('../../src/index');
const bcrypt = require('bcryptjs');

jest.mock('bcryptjs');

describe('Auth Routes', () => {
  describe('POST /auth/login', () => {
    it('should return token with valid credentials', async () => {
      bcrypt.compare.mockResolvedValue(true);

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'password123' })
        .expect(200);

      expect(response.body.token).toBeDefined();
    });
  });
});