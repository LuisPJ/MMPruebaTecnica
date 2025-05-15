const request = require('supertest');
const app = require('../../src/index');
const jwt = require('jsonwebtoken');

describe('NLP Routes', () => {
  describe('POST /nlp/analyze', () => {
    it('should return 401 without token', async () => {
      await request(app)
        .post('/nlp/analyze')
        .send({ text: 'Test text' })
        .expect(401);
    });

    it('should return 200 with valid token', async () => {
      const validToken = jwt.sign(
        { userId: 1 }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      const response = await request(app)
        .post('/nlp/analyze')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ text: 'Happy text' })
        .expect(200);

      expect(response.body).toEqual({
        wordCount: expect.any(Number),
        sentiment: expect.any(String)
      });
    });

    it('should return 401 with expired token', async () => {
      const expiredToken = jwt.sign(
        { userId: 1 }, 
        process.env.JWT_SECRET, 
        { expiresIn: '-1s' }
      );

      await request(app)
        .post('/nlp/analyze')
        .set('Authorization', `Bearer ${expiredToken}`)
        .send({ text: 'Happy text' })
        .expect(401);
    });
  });
});