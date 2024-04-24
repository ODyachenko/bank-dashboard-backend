import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { loginValidation, registerValidation } from './validations/auth.js';
import { checkAuth } from './utils/checkAuth.js';
import { login, register, userInfo } from './contollers/UserController.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
configDotenv();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Error', err));

app.post('/auth/register', registerValidation, register);
app.post('/auth/login', loginValidation, login);
app.get('/auth/me', checkAuth, userInfo);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${port}`);
});
