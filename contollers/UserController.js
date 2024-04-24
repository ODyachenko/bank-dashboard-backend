import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { password, ...formData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new User({ ...formData, passwordHash: hash });
    const user = await doc.save();
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (error) {
    res.status(500).json({
      message:
        error.errorResponse.code === 11000
          ? 'Email alredy exist!'
          : 'Registration Failed',
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: 'Incorrect login or password',
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Incorrect login or password',
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_HASH, {
      expiresIn: '30d',
    });
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    res.status(401).json({
      message: 'Login Failed',
    });
  }
};

export const userInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData });
  } catch (error) {
    res.status(403).json({
      message: 'No Access',
    });
  }
};
