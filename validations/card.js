import { body } from 'express-validator';

export const cardValidation = [
  body('name', 'Please enter the valid card name').isLength({
    min: 4,
  }),
  body('holder', 'Full name must be greater than 4 symbols').isLength({
    min: 4,
  }),
  body('expiredDate', 'Please enter the valid date').isDate(),
  body('number', 'Сard number must be 10 digits').isNumeric().isLength(10),
  body('cvv').isNumeric(),
];
