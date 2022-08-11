"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");

const station = require('./controllers/station.js');

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/station/:id", station.index);
router.get('/station/:id/deletereading/:readingid', station.deleteReading);
router.get('/dashboard/deletestation/:id', dashboard.deleteStation);
router.post('/station/:id/addreading', station.addReading);
router.post('/dashboard/addstation', dashboard.addStation);

module.exports = router;
