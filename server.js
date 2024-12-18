import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import hbs from 'hbs';

import uiRoute from './ui/ui.route';
import pageRoute from './routes/page.route';
import userRoute from './routes/user.route';
import User from './modals/user.modal.js';
import bcrypt from 'bcrypt';

let counter = 0;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/resources', express.static(path.join(__dirname, 'public')));
app.use('views', express.static(path.join(__dirname, 'views')));

const mongoUri = process.env.CONNECTION_STRING;

mongoose.connect(mongoUri)
  .then(() => { console.log('Connected to DB'); })
  .catch((err) => { console.error('Error connecting to MongoDB:', err); });

app.set('view engine', 'hbs');

hbs.registerHelper('eq', function (a, b) {
  return a.toString() === b.toString();
});

hbs.registerHelper('incrementCounter', () => {
  counter++;
});

hbs.registerHelper('getCounter', () => {
  const count = counter;
  counter = 0;
  return count;
});

hbs.registerHelper('eq', function (a, b) {
  return a?.toString() === b?.toString();
});

hbs.registerHelper('json', function (context) {
    return JSON.stringify(context);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id); 
});

passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => {
          done(null, user);
      })
      .catch(err => {
          done(err, null);
      });
});

import LocalStrategy from 'passport-local';
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        console.log('Login Attempt - Email:', email);
        const user = await User.findOne({ email });
        if (!user) {
          console.log('User not found');
          return done(null, false, { message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match Result:', isMatch);
        if (!isMatch) {
          console.log('Incorrect password');
          return done(null, false, { message: 'Invalid credentials' });
        }
        console.log('User authenticated successfully:', user);
        return done(null, user);
      } catch (error) {
        console.error('Error in LocalStrategy:', error);
        return done(error);
      }
    }
  )
);

app.use('/pages', pageRoute);
app.use('/users', userRoute);
app.use('/', uiRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
