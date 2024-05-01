import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { configDotenv } from 'dotenv';
import { loginValidation, registerValidation } from './validations/auth.js';
import { checkAuth } from './utils/checkAuth.js';
import { login, register, userInfo } from './contollers/UserController.js';

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

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Error', err));

app.post('/auth/register', registerValidation, register);
app.post('/auth/login', loginValidation, login);
app.get('/auth/me', checkAuth, userInfo);

app.post('/uploads/avatar', upload.single('avatar'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${port}`);
});
