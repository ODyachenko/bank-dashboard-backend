import express from 'express';
import multer from 'multer';
import { configDotenv } from 'dotenv';
import { connectToDB } from './db.js';
import { loginValidation, registerValidation } from './validations/auth.js';
import { cardValidation } from './validations/card.js';
import { transactionValidation } from './validations/transaction.js';
import { checkAuth } from './utils/checkAuth.js';
import { login, register, userInfo } from './contollers/UserController.js';
import {
  createCard,
  removeCard,
  retrieveCards,
} from './contollers/CardController.js';
import {
  createTransaction,
  retrieveTransactions,
} from './contollers/TransactionController.js';
import Transaction from './models/Transaction.js';

const app = express();
const port = process.env.PORT || 3001;
const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
configDotenv();
connectToDB();

// User
app.post('/auth/register', registerValidation, register);
app.post('/auth/login', loginValidation, login);
app.get('/auth/me', checkAuth, userInfo);

// Storage
app.post('/uploads/avatar', upload.single('avatar'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

// Card
app.post('/cards', checkAuth, cardValidation, createCard);
app.get('/cards', checkAuth, retrieveCards);
app.delete('/cards/:id', checkAuth, removeCard);

// Transaction
app.post('/transactions', transactionValidation, createTransaction);
app.get('/transactions', checkAuth, retrieveTransactions);

// Investment

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${port}`);
});
