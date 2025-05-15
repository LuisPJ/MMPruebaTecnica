const axios = require('axios');
require('dotenv').config();

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'adobe';
const REPO_NAME = 'react-spectrum';

class ConsumeGithubService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: GITHUB_API_URL,
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'User-Agent': 'Node.js Github Consumer',
            }
        });
    }

    async getRepoDetails() {
        try {
            const response = await this.axiosInstance.get(`/repos/${REPO_OWNER}/${REPO_NAME}`);
            const { name, description, stargazers_count, forks_count } = response.data;
            return {
                name,
                description,
                stars: stargazers_count,
                forks: forks_count
            };
        } catch (error) {
            console.error('Error fetching repo details:', error.message);
            throw error;
        }
    }

    async getRepoIssues() {
        try {
            const response = await this.axiosInstance.get(`/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
                params: {
                    per_page: 3,
                    page: 1,
                }
            });

            return response.data.map(issue => ({
                id: issue.id,
                title: issue.title,
                state: issue.state,
            }));

        } catch (error) {
            console.error('Error fetching repo issues:', error.message);
            throw error;
        }
    }
}

module.exports = new ConsumeGithubService();