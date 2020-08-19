        require('dotenv').config()
const express                              = require('express'),
          bodyParser                        = require('body-parser'),
          mongoose                         = require('mongoose'),
          flash                                  = require('connect-flash'),
          Campground                     = require('./models/campground'),
          Comment                          = require("./models/comment"),
          Review                              = require("./models/review"),
          request                             = require("request"),
          seedDB                             = require('./seeds'),
          passport                           = require("passport"),
          User                                  = require("./models/user"),
          LocalStrategy                   = require('passport-local'),
          methodOveride                = require('method-override'),
          passportLocalMongoose = require('passport-local-mongoose'),
          app                                    = express();



//REQUIRING ROUTES
const commentRoutes               = require("./routes/comments"),
          campgroundRoutes         = require("./routes/campgrounds"),
          authRoutes                       = require("./routes/index");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v2", { useNewUrlParser: true });
mongoose.createConnection("mongodb://localhost/yelp_camp_v2", { useNewUrlParser: true });
//============
//SETUP
//============
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOveride('_method'));
app.use(flash());
// seedDB(); //SEED THE DATABASE

//==============
//PASSPORT CONFIG
//==============
app.use(require("express-session")({
  secret:"Fire up the grill",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success= req.flash("success");
  next();
});

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);



//============
//SERVER
//============
var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function(){
  console.log("YelpCamp Server has Started");
});














// var campgrounds = [
//   {name: "Katahdin", image: "https://www.northernoutdoors.com/wp-content/uploads/katahdin-camping-penobscot-river.jpg"},
//   {name: "Acadia", image: "https://www.citrusmilo.com/acadia2016/joebraun_acadiamountain01.jpg"},
//   {name: "Rangeley Lake", image: "https://www.tripsavvy.com/thmb/Fsi7e3s_Z1kCfKJYGcWaNheCxrk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/height-of-land-1-lg-56fbf8045f9b5829868e31bd-5a50545a4d9640a0a47b691c498045d4.jpg"},
//   {name: "Katahdin", image: "https://www.northernoutdoors.com/wp-content/uploads/katahdin-camping-penobscot-river.jpg"},
//   {name: "Acadia", image: "https://www.citrusmilo.com/acadia2016/joebraun_acadiamountain01.jpg"},
//   {name: "Rangeley Lake", image: "https://www.tripsavvy.com/thmb/Fsi7e3s_Z1kCfKJYGcWaNheCxrk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/height-of-land-1-lg-56fbf8045f9b5829868e31bd-5a50545a4d9640a0a47b691c498045d4.jpg"},
//   {name: "Katahdin", image: "https://www.northernoutdoors.com/wp-content/uploads/katahdin-camping-penobscot-river.jpg"},
//   {name: "Acadia", image: "https://www.citrusmilo.com/acadia2016/joebraun_acadiamountain01.jpg"},
//   {name: "Rangeley Lake", image: "https://www.tripsavvy.com/thmb/Fsi7e3s_Z1kCfKJYGcWaNheCxrk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/height-of-land-1-lg-56fbf8045f9b5829868e31bd-5a50545a4d9640a0a47b691c498045d4.jpg"}
// ]
