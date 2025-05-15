const natural = require('natural');
const {SentimentAnalyzer, PorterStemmer} = require('natural');
const tokenizer = new natural.WordTokenizer();

class ConsumeNaturalService {
  constructor() {
    this.sentimentAnalyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  }

  analyzeSentiment(text) {
    
    if(!text) {
      throw new Error('Text is required for sentiment analysis');
    }

    const tokens = tokenizer.tokenize(text);
    const wordCount = tokens.length;
    const sentimentScore = this.sentimentAnalyzer.getSentiment(tokens);

    return {
        wordCount,
        sentiment: this.normalizeSentiment(sentimentScore),
    };
  }

    normalizeSentiment(score) {
        if (score > 0) {
            return 'positive';
        } else if (score < 0) {
            return 'negative';
        } else {
            return 'neutral';
        }
    }
}

module.exports = new ConsumeNaturalService();