// Load Environment Variables
require('dotenv').config();
const express = require('express');


const app = express();

const connectString = `Test String`;

app.get('/', (req, res) => {
    res.send(connectString);
});

app.post('/users', (req, res) => {
    res.send('User created');
});
