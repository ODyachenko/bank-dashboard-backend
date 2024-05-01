import { body } from 'express-validator';

export const cardValidation = [
  body('name', 'Please enter the valid card name').isCreditCard(),
  body('holder', 'Full name must be greater than 4 symbols').isLength({
    min: 4,
  }),
  body('expiredDate', 'Please enter the valid date').isDate(),
  body('number').isNumeric().isLength(10),
  body('cvv').isNumeric(),
  body('').isIdentityCard,
];
