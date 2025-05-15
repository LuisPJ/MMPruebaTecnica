const request = require('supertest');
const app = require('../../src/index');
const ConsumeGithubService = require('../../src/services/ConsumeGithub.service');

jest.mock('../../src/services/ConsumeGithub.service', () => ({
  getRepoDetails: jest.fn(),
  getRepoIssues: jest.fn()
}));

describe('GitHub API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /repos/adobe/react-spectrum', () => {
    it('should return 200 and expected repo details', async () => {
      ConsumeGithubService.getRepoDetails.mockResolvedValue({
        name: 'react-spectrum',
        description: 'Test description',
        stars: 1000,
        forks: 200
      });

      const response = await request(app)
        .get('/repos/adobe/react-spectrum')
        .expect(200);

      expect(response.body).toEqual({
        name: 'react-spectrum',
        description: 'Test description',
        stars: 1000,
        forks: 200
      });

      expect(ConsumeGithubService.getRepoDetails).toHaveBeenCalledTimes(1);
    });

    it('should return 500 when service throws error', async () => {
      ConsumeGithubService.getRepoDetails.mockRejectedValue(new Error('Service Error'));

      const response = await request(app)
        .get('/repos/adobe/react-spectrum')
        .expect(500);

      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('GET /repos/adobe/react-spectrum/issues', () => {
    it('should return 200 and first 3 issues', async () => {
      ConsumeGithubService.getRepoIssues.mockResolvedValue([
        { id: 1, title: 'Issue 1', state: 'open' },
        { id: 2, title: 'Issue 2', state: 'open' },
        { id: 3, title: 'Issue 3', state: 'closed' }
      ]);

      const response = await request(app)
        .get('/repos/adobe/react-spectrum/issues')
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toEqual({
        id: 1,
        title: 'Issue 1',
        state: 'open'
      });

      expect(ConsumeGithubService.getRepoIssues).toHaveBeenCalledTimes(1);
    });

    it('should return 500 when service throws error', async () => {
      ConsumeGithubService.getRepoIssues.mockRejectedValue(new Error('Service Error'));

      const response = await request(app)
        .get('/repos/adobe/react-spectrum/issues')
        .expect(500);

      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });
});