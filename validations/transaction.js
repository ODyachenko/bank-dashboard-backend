import { body } from 'express-validator';

export const transactionValidation = [
  body('name').isLength({
    min: 5,
    max: 50,
  }),
  body('value').isNumeric(),
  body('type').isLength({
    min: 4,
    max: 30,
  }),
  body('direction').isLength({
    min: 6,
    max: 10,
  }),
  body('status').isLength({
    min: 3,
    max: 20,
  }),
];
