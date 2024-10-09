const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./middleware/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', passport.authenticate('jwt', { session: false }), require('./routes/employees'));
app.use('/api/attendance', passport.authenticate('jwt', { session: false }), require('./routes/attendance'));
app.use('/api/leave', passport.authenticate('jwt', { session: false }), require('./routes/leave'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;