import { body } from 'express-validator';

export const registerValidation = [
  body('firstName', 'First Name must be greater than 2 symbols').isLength({
    min: 2,
  }),
  body('lastName', 'Last Name must be greater than 2 symbols').isLength({
    min: 2,
  }),
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be greater than 5 symbols').isLength({
    min: 5,
  }),
  body('dateOfBirth', 'Invalid Date format').optional().isDate(),
  body('address', 'Address must be greater than 5 symbols')
    .optional()
    .isLength({ min: 5 }),
  body('city', 'City must be greater than 3 symbols')
    .optional()
    .isLength({ min: 3 }),
  body('postalCode', 'Postal Code must be equal 5 symbols')
    .optional()
    .isLength({ min: 5, max: 5 }),
  body('country', 'Country must be greater than 3 symbols')
    .optional()
    .isLength({ min: 3 }),
  body('avatarUrl', 'Invalid URL format').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be greater than 5 symbols').isLength({
    min: 5,
  }),
];
