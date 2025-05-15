const consumeGitHubService = require('../services/ConsumeGithub.service');

const getRepoDetails = async (req, res) => {
    try {
        const repoDetails = await consumeGitHubService.getRepoDetails();
        res.status(200).json(repoDetails);
    } catch (error) {
        console.error('Error in getRepoDetails controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getRepoIssues = async (req, res) => {
    try {
        const repoIssues = await consumeGitHubService.getRepoIssues();
        res.status(200).json(repoIssues);
    } catch (error) {
        console.error('Error in getRepoIssues controller:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getRepoDetails,
    getRepoIssues
}