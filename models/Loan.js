import mongoose, { Schema } from 'mongoose';

const LoanSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId(),
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    leftAmount: {
      type: Number,
    },
    duration: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    installment: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.Schema('Loan', LoanSchema);
