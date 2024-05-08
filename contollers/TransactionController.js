import { validationResult } from 'express-validator';
import Transaction from '../models/Transaction.js';
import Card from '../models/Card.js';

export const createTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const transaction = new Transaction(req.body);
    await transaction.save();

    res.status(201).json({
      success: true,
      transaction: req.body,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Create transaction failed',
    });
  }
};

export const retrieveTransactions = async (req, res) => {
  try {
    const cards = await Card.find()
      .populate('userId')
      .find({ userId: req.userId });
    const cardsId = cards.map((card) => card._id);
    const transactions = await Transaction.find({ cardId: cardsId });

    res.status(200).json({
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Can not retrieve transactions',
    });
  }
};
