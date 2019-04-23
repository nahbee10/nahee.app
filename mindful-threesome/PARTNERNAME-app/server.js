/* (partnerName)-app/server.js */

var express = require('express');
var app = express();
var mindfulThreesome = require('mindfull-threesome');

app.use(mindful3some.mindfulSetup({partnerAddress:"http://142.93.61.73:4000"}));

app.use("/api/contact", mindfulThreesome.mindfulContact()); 
app.use("/api/sound", mindfulThreesome.mindfulMoan());  
app.use("/api/face/gaze", mindfulThreesome.mindfulEyeGaze());

app.listen(4000);

