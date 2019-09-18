module.exports = {
    "development":{
        mongoServer : process.env.MONGO_SERVER || 'localhost',
        mongoPort : process.env.MONGO_PORT || 27017,
        mongoDBName : process.env.MONGO_DBNAME || 'docker-app-db',
        redisServer : process.env.REDIS_SERVER || 'localhost',
        redisPort : process.env.REDIS_PORT || 6379,
        webPort : process.env.WEB_PORT || '3000'
    },

    "production":{
        mongoServer : process.env.MONGO_SERVER || 'localhost',
        mongoPort : process.env.MONGO_PORT || 27017,
        mongoDBName : process.env.MONGO_DBNAME || 'docker-app-db',
        redisServer : process.env.REDIS_SERVER || 'localhost',
        redisPort : process.env.REDIS_PORT || 6379,
        webPort : process.env.WEB_PORT || '80'
    },

    getConfigEnv: function(){
        var envType = process.env.BZ_ENV || 'development';
        return this[envType];
    },

    getMongoConnectionString : function(){
        var envSettings = this.getConfigEnv();
        return 'mongodb://'+envSettings.mongoServer+':'+envSettings.mongoPort +"/"+ envSettings.mongoDBName;
    },

    getRedisConnectionString: function(){
        var envSettings = this.getConfigEnv();
        return 'redis://'+envSettings.redisServer+":"+envSettings.redisPort;
    },

    getWebPort: function(){
        var envSettings = this.getConfigEnv();
        return envSettings.webPort;
    }
}