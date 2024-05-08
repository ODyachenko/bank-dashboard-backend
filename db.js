import mongoose from 'mongoose';

export const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('DB Error', err));
};
