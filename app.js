const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

const app = express();

//Using mongoDb for cloud database
const MONGODB_URI =
  'mongodb+srv://omabney:Fi6L05VQ67BizcxN@cluster0.ic8g6.mongodb.net/todoapp?retryWrites=true&w=majority';

  const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my todoapp',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

//Chceking if the user has a valid session
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
  
app.use(authRoutes);
app.use(todoRoutes);

//Connecting to the database
mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
})
.catch(err =>{
    console.log(err);
});