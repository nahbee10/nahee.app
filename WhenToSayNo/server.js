var express = require('express');
var app = express();
var declineHelper = require('when-to-say-no');

app.use(declineHelper.setup());
app.use("/api/sex/request", declineHelper.wllngnssCalibrationForSelf()); 

app.listen(4000);

