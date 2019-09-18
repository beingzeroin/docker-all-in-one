// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const envConfig = require('./config/config');
const redis = require("redis");

// Connect to mongodb
mongoose.connect(envConfig.getMongoConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });

// Conect to Redis
const redisClient = redis.createClient(envConfig.getRedisConnectionString());

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

// Test Redis
redisClient.set("string key", "string val", redis.print);
redisClient.get("string key", function(err, data){
  if(err)
    console.log("REDIS ERR: "+JSON.stringify(err));
  else
    console.log("REDIS VALUE:  "+data);
})


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
app.set('port', envConfig.getWebPort());

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(app.get('port'), () => console.log(`API running on localhost:${app.get('port')}`));