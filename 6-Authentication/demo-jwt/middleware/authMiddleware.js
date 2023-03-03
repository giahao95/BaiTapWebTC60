const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token)
    return res.status(400).send('Ban khong co quyen truy cap vao he thong');

  try {
    const checkToken = jwt.verify(token, 'private-key');
    req.user = checkToken;
    next();
  } catch (error) {
    res.status(400).send('Token incorrect - Permission denied');
  }
};
