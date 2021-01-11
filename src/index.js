const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(authRoutes)

const mongoURI = process.env.MONGOURI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true  
})

mongoose.connection.on('connected', () => {
    console.log('connected to instance')
})

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to mongo`, err);
})

app.get('/', (req, res) => {
    res.send('hi there!');
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})