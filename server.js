const fallback = require('express-history-api-fallback');
const express = require('express');

const path = require('path');

const app = express();
const root = path.join(__dirname, './dist');
const PORT = 3000;

app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(PORT, () => { console.log(`Example app listening on port ${PORT}!`); });
