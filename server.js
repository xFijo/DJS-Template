const express = require('express');

const app = express();
const port = process.env.PORT || 1234;

app.all('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => console.log('Connection has been established.'));
