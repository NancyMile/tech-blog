const router = require('express').Router();
const { User } = require('../../models');
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    //If there is no data return 400 and message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect login details.' });
      return;
    }
    //review, validate the password
    const password = await userData.reviewPassword(req.body.password);
    if (!password) {
      res
        .status(400)
        .json({ message: 'Incorrect login details.' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'Logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
