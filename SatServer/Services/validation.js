const { body, validationResult, oneOf } = require('express-validator');
const URL = require('url').URL;

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

// Simple URL validation for profile pic, using Nodes built in url module. An
// invalid URL should throw a type error when parsed
const urlValidator = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.user = [
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
  body('picture')
    .isLength({ min: 6, max: 400 })
    .trim()
    .optional()
    .custom((p) => (urlValidator(p) ? true : false)),

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
