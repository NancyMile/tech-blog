const router = require('express').Router();
const { Post } = require('../../models'); //utils for authorisation
const withAuth = require('../../utils/auth');
//call withauth
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    //return success
    res.status(200).json(newPost);
  } catch (err) {
    //return not found
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
        //user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id
        //user_id: req.session.user_id,
      },
      individualHooks: true,
    });
    if (!updatedPost[0]) {
      // No post found
      res.status(404).json({
        message: "No post with this id found!"
      });
      return;
    }
    // Succesful update
    res.status(200).json({
      data: updatedPost,
      message: "Post is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

module.exports = router;