"use strict";

const express = require("express");
const router = express.Router();

const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const station = require('./controllers/station.js');
const accounts = require('./controllers/accounts.js');


//accounts
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/account', accounts.accountDetails);
router.post('/editMember', accounts.editMember);

//dashboards
router.get("/dashboard", dashboard.index);
router.get('/dashboard/deletestation/:id', dashboard.deleteStation);
router.post('/dashboard/addstation', dashboard.addStation);


//stations
router.get("/station/:id", station.index);
router.get('/station/:id/deletereading/:readingid', station.deleteReading);
router.post('/station/:id/addreading', station.addReading);
router.post("/station/:id/autoreport", station.autoReport);

//about
router.get("/about", about.index);


module.exports = router;
