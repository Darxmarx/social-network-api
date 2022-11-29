// require router for modularity
const router = require('express').Router();
// import routes from user and thought route files
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of '/users' to user routes
router.use('/users', userRoutes);
// add prefix of '/thoughts' to thought routes
router.use('/thoughts', thoughtRoutes);

// export data for use elsewhere
module.exports = router;
