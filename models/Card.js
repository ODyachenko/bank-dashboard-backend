import mongoose, { Schema } from 'mongoose';

const CardSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    balance: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    expiredDate: {
      type: Date,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    holder: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Card', CardSchema);
