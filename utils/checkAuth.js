import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_HASH);
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'No Access',
      });
    }
  } else {
    res.status(400).json({
      message: 'Invalid Token',
    });
  }
};
