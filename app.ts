import { MongoService } from './mongo-service';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var plating = require('./routes/plating');

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', async (err)=>
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);
	await MongoService.getInstance().closeConnection();
	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection',  (reason: any, promise)=>
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

var mongoService = MongoService.getInstance();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/jobcard', plating);

module.exports = app;
