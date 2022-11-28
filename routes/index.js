// require router for modularity
const router = require('express').Router();
// import api routes from api folder
const apiRoutes = require('./api');

// add prefix of '/api' to api routes
router.use('/api', apiRoutes);

// returns error if other routes are attempted
router.use((req, res) => res.send('Wrong route.'));

// export data for use elsewhere
module.exports = router;
