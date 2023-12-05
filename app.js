require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const MONGO = process.env.MONGODB;
const db = mongoose.connection;

//* Imports
const userController = require('./controllers/user.controller');

//* Middleware
mongoose.connect(`${MONGO}/movies`);
db.once('open', () => console.log(`Connected: ${MONGO}`));
app.use(express.json());

//* Routes
app.use('/user', userController);

app.listen(PORT, () => console.log(`Movie Server: ${PORT}`));

