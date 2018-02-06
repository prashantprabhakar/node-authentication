var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session')
//const RedisStore = require('connect-redis')(session)


var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config/config.js');

var dbUrl = config.database;


var app = express();

/*app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}));*/
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret


app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.use('/', index);
app.use('/users', users);


/*Connect to database*/
mongoose.connect(dbUrl);

mongoose.connection.on('error', function(err){
	console.log("MongoDB connection Error");
	process.exit(0);
});


mongoose.connection.once('open', function() {
	//Lets start our server
	app.listen(config.serverport, function() {
	  console.log(`[+] Listening ${config.serverport}`);
	})  // Start App Listener
})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
