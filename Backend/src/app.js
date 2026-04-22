const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const authUserRoute = require('./routes/auth.route');

connectDB();


const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/auth', authUserRoute);

module.exports = app;
