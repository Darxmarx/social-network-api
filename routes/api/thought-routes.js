// require router for modularity
const router = require('express').Router();

// object that contains controllers from thought-controller
const {
  getAllThought,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts (GET all thoughts, POST new thought)
router.route('/')
  .get(getAllThought)
  .post(addThought);

// /api/thoughts/:thoughtId (GET thought by id, PUT updated thought details, DELETE thought)
router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/:thoughtId/reactions (POST new reaction)
router.route('/:thoughtId/reactions')
  .post(addReaction);   

// /api/thoughts/:thoughtId/:reactionId (DELETE reaction by id)
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

// export router for use elsewhere
module.exports = router;
