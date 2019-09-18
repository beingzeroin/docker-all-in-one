// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require("redis");
const redisServer = process.env.REDIS_SERVER || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const redisURL = 'redis://'+redisServer+":"+redisPort;

const redisClient = redis.createClient(redisURL);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
redisClient.on("error", function (err) {
    console.log("Error " + err);
});
redisClient.set("string key", "string val", redis.print);
redisClient.get("string key", function(err, data){
  if(err)
    console.log("REDIS ERR: "+JSON.stringify(err));
  else
    console.log("REDIS VALUE:  "+data);
})

// MongoDB URL from the docker-compose file
const mongoServer = process.env.MONGO_SERVER || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDBName = process.env.MONGO_DBNAME || 'docker-app-db';
const dbHost = 'mongodb://'+mongoServer+':'+mongoPort +"/"+ mongoDBName;

// Connect to mongodb
mongoose.connect(dbHost, { useNewUrlParser: true, useUnifiedTopology: true });

// Get our API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Set our api routes
app.use('/', api);


/**
 * Get port from environment and store in Express.
 */
const port = process.env.WEB_PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));