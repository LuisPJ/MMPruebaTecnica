const consumeNaturalService = require('../services/ConsumeNatural.service');

const analyzeSentiment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required for sentiment analysis' });
        }

        const result = await consumeNaturalService.analyzeSentiment(text);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    analyzeSentiment,
};