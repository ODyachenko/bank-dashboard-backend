import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    cardId: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', TransactionSchema);
