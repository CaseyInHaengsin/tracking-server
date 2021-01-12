const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log(req.body);  
  const { email, password } = req.body;
  const user = new User({ email, password });
  try{
  await user.save(); 
  res.send('you made a post request')
  }catch(err){
    res.status(422).send({err})
    console.log(err);
  }
})

module.exports = router
