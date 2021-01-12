const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');



module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization){
    res.status(401).send({error: "you must be signed in"})
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err){
      return res.status(401).send({error: "you must be signed in"})
    }
    const { userId } = payload;
    const user = await User.finById(userId);
    req.user = user;
    next();
  })
}