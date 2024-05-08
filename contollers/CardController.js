import { validationResult } from 'express-validator';
import Card from '../models/Card.js';

export const createCard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const card = new Card(req.body);
    await card.save();

    res.status(201).json({
      success: true,
      card: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Oops, Something wrong!!!\n Try again later',
    });
  }
};

export const retrieveCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.userId });

    res.status(200).json({
      cards: cards,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Can not retrieve cards!',
    });
  }
};

export const removeCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Can not delete a card!',
    });
  }
};
