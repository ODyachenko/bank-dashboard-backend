import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  returnRate: {
    type: Number,
    required: true,
  },
});

export default mongoose.Schema('Stock', StockSchema);
