const express = require('express');
const bodyParser = require('body-parser');
const transactionsRoutes = require('./routes/transaction');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', transactionsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
