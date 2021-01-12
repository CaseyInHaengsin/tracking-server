require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json())
app.use(authRoutes);



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

app.get('/', requireAuth, (req, res) => {
  
  console.log('requested')  
  res.send(`Your email: ${req.user.email}`);

})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
