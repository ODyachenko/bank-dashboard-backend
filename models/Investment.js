import mongoose, { Schema } from 'mongoose';

const InvestmentSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId(),
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    returnValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Investment', InvestmentSchema);
