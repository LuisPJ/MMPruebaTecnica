require('dotenv').config();
const express = require('express');
const consumeGithubRoutes = require('./routes/ConsumeGithub.routes');
const consumeNaturalRoutes = require('./routes/ConsumeNatural.routes');
const authRoutes = require('./routes/Auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/repos/', consumeGithubRoutes);
app.use('/nlp/', consumeNaturalRoutes);
app.use('/auth/', authRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}
  
module.exports = app;