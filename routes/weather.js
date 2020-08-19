const express = require("express");
const  request = require("request");
const bodyParser = require('body-parser');
const app = express();
let userCount = 0;
let apiKey = 'abd88d0f88e03ed0e64ed386a20ccdd0';

//MIDDLEWARE=====================================================
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

//OPEN=WEATHER=API===============================================
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render({weather: null, error: 'Error, please try again'});
    } else {
      console.log(body)
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render( {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${Math.round(weather.main.temp)} degrees in ${weather.name}!`;
        res.render({weather: weatherText, error: null});
      }
    }
  });
})

console.log(weatherText);
