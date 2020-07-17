const express = require('express');
const connectDB = require('../../config/db');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route POST api/users
// @desc Register User
// @access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('age', 'Age is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      email,
      password,
      firstname,
      lastname,
      country,
      city,
      age,
    } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Users already exists' }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const membership = '0';
      // Encrypt password
      user = new User({
        email,
        avatar,
        password,
        firstname,
        lastname,
        country,
        city,
        age,
        membership,
      });
      const salt = await bcrypt.genSalt(10); // 10 to seed

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route GET api/auth
// @desc Text route
// @access Public

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .select('-_id');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/users/all
// @desc Get all profiles
// @access public

router.get('/all', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });

    if (user.membership == undefined || user.membership == 0) {
      res.status(403).send('No membership');
      return; // Ważne zeby tu dac return inaczej wykona sie dalszy res i bedzie błąd
    } else if (user.membership == '1') {
      const users1 = await User.find({ membership: '1' })
        .select('-password')
        .select('-_id');

      res.json(users1);
    } else if (user.membership == '2') {
      const users1 = await User.find({ membership: '1' })
        .select('-password')
        .select('-_id');
      const users2 = await User.find({ membership: '2' })
        .select('-password')
        .select('-_id');
      res.json(users1.concat(users2));
    } else {
      const users1 = await User.find({ membership: '1' })
        .select('-password')
        .select('-_id');
      const users2 = await User.find({ membership: '2' })
        .select('-password')
        .select('-_id');
      const users3 = await User.find({ membership: '3' })
        .select('-password')
        .select('-_id');

      res.json(users1.concat(users2.concat(users3)));
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
