import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    dateOfBirth: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
