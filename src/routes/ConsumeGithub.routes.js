const express = require('express');
const router = express.Router();
const consumeGitHubController = require('../controllers/ConsumeGithub.controller');

router.get('/adobe/react-spectrum', consumeGitHubController.getRepoDetails);
router.get('/adobe/react-spectrum/issues', consumeGitHubController.getRepoIssues);

module.exports = router;