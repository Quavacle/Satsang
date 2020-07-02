const { body, validationResult, oneOf } = require('express-validator');

module.exports.instance = [
  body('book').trim().escape(),
  body('user').trim().escape(),
  body('condition')
    .trim()
    .isAlphanumeric()
    .withMessage('Letters and numbers only')
    .optional({ checkFalsy: true })
    .escape(),
  body('notes')
    .trim()
    .isAlphanumeric()
    .withMessage('Letters and numbers only')
    .optional({ checkFalsy: true })
    .escape(),
  body('rating')
    .isLength(1)
    .trim()
    .isNumeric()
    .optional({ checkFalsy: true })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(300).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports.register = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .trim()
    .withMessage('Username required')
    .isAlphanumeric()
    .withMessage('Username must only contain letters and numbers')
    .escape(),
  body('email').isEmail().normalizeEmail(),

  body('name')
    .isLength({ max: 200 })
    .withMessage('Your name is very long, perhaps use a nickname?')
    .optional({ checkFalsy: true })
    .trim()
    .escape(),

  body('password').isLength({ min: 5, max: 200 }).trim(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(300).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports.logIn = [
  oneOf([
    [
      body('username')
        .isLength({ min: 3, max: 50 })
        .trim()
        .withMessage('Username required')
        .isAlphanumeric()
        .withMessage('Username must only contain letters and numbers')
        .escape(),
    ],

    body('email').isEmail().normalizeEmail(),
  ]),

  body('password').isLength({ min: 4, max: 200 }).trim(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(300).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports.book = function (req, res, next) {};
