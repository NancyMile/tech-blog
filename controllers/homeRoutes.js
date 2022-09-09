const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', async (req, res) => {
  try {
    // posts and users
    const postData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // posts data for the template
    const posts = postData.map((post) => post.get({ plain: true }));
    // session data
    res.render('home', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//get post details
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//withAuth middleware
router.get('/post', withAuth, async (req, res) => {
  try {
    // Logged in user based on session id
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    //user data
    const user = userData.get({ plain: true });
    res.render('post', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//login
router.get('/login', (req, res) => {
  // Redirect to another route
  if (req.session.logged_in) {
    res.redirect('/post');
    return;
  }
  res.render('login');
});

module.exports = router;