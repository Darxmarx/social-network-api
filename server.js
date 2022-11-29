// require express and mongoose
const express = require('express');
const mongoose = require('mongoose');

// initialize express and port to listen on
const app = express();
const PORT = process.env.PORT || 3001;

// allow json and urlencoded for api routes, enable modularity with router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// set up mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// log mongo queries being executed
mongoose.set('debug', true);

// listens to port on successful connection
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}!`));
