// var apiKey = require("./api_key");
// var munroList = require("../test_data");
//cannot require these without webpack. No progress from dummy data...

var munroList = [
  {
    _id: 1,
    name: "A'Bhuidheanach Bheag",
    height:  936.1,
    gridRef: {
      letters: "NN",
      eastings: "66069",
      northings: "77600"
    },
    latLng: {
      lat: 56.87039900,
      lng: -4.1988390
    }
  },
  {
    _id: 2,
    name: "A'Chailleach",
    height:  997.0,
    gridRef: {
      letters: "NH",
      eastings: "13620",
      northings: "71414"
    },
    latLng: {
      lat: 57.69378200,
      lng: -5.1287300
    }
  },
  {
    _id: 3,
    name: "A'Chailleach",
    height:  929.2,
    gridRef: {
      letters: "NH",
      eastings: "68110",
      northings: "04178"
    },
    latLng: {
      lat: 57.10956400,
      lng: -4.1792850
    }
  },
  {
    _id: 4,
    name: "A'Chraileag (A'Chralaig)",
    height: 1120.0,
    gridRef: {
      letters: "NH",
      eastings: "09431",
      northings: "14797"
    },
    latLng: {
      lat: 57.18424000,
      lng: -5.1548420
    }
  },
  {
    _id: 5,
    name: "A'Ghlas-bheinn",
    height:  918.0,
    gridRef: {
      letters: "NH",
      eastings: "00822",
      northings: "23105"
    },
    latLng: {
      lat: 57.25509000,
      lng: -5.3036870
    }
  }
];
var weatherObjs = [];
var counter = 0;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var response = JSON.parse(jsonString);
  console.log(response)
  saveWeather(response);
  console.log(counter)
  counter++;
  if (weatherObjs.length < munroList.length){
    // setTimeout(function(){
      makeRequest(urlGenerator(), requestComplete);
      // console.log(counter)
    // }, 1050);
    //timeout maybe not required. Put back in if we have any issues
  };
};
//can we make this call when the mountain is created?? Maybe when we host the munro api ourselves, we can make both requests at the same time and save them together??

var saveWeather = function(response){
  var weatherObj = response[counter];
  weatherObjs.push(weatherObj);
};

var latLngGenerator = function(){
  var latLng = munroList[counter].latLng;
  return latLng;
};

var urlGenerator = function(){
  var apiKey = key();
  var lat = latLngGenerator().lat;
  var lng = latLngGenerator().lng;
  var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + apiKey;
  //api key hidden in other file
  return url;
};

var app = function(){
  var url = urlGenerator();
  makeRequest(url, requestComplete);
  console.log(weatherObjs);
};

window.onload = app;
