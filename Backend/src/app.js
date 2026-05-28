const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const authUserRoute = require('./routes/auth.route');
const captainRoute = require('./routes/captain.route');
const mapRoute = require('./routes/map.route')
const rideRoute = require('./routes/ride.route');

connectDB();


const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/auth', authUserRoute);
app.use('/api/captain', captainRoute);
app.use('/maps',mapRoute);
app.use('/rides',rideRoute);

module.exports = app;
