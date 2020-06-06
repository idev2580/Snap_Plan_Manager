const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());


const router = require('./router/main.js')(app);

const port = 4000;


app.listen(port,()=>console.log(`Example app listening at http://localhost:${port}`));
