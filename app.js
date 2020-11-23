const express = require("express");
const https = require("https");
// body-parser is for looking in the body and fetch data based on name of input.
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// tell express our css files are in the public folder
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "3c7bff392c1f1d14d4a3bae59f903bc4";
  const unit = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          "degrees Fahrenheit.</h1>"
      );
      res.write(
        "<p>The weather conditions are currently " + weatherDescription + "<p>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// 3c7bff392c1f1d14d4a3bae59f903bc4
