$(document).ready(function () {
  var today = moment();
  $("#currentDate").text(today.format("MM/D/YYYY"));

  //enter a city and click on the button to start the function
  $("#searchBtn").click(function () {
    var apiKey = "f09f4ec07381c8ad73b8d4125cb8e86b";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var queryUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=";
    // console.log("test");

    var searchInput = $("#searchInput").val().trim();
    console.log(searchInput);
    $.getJSON(queryUrl + searchInput + "&appid=" + apiKey, function (data) {
      console.log("object", data);
      // pulls the data for the temp
      var temp = data.main.temp - 273.15
      temp = parseInt(temp * 1.8 + 32)
      var tempValue = temp

      console.log("temp", tempValue);
      //set temp content into html
      $("#tempValue").text(tempValue);
      // pulls data for wind
      var windValue = data.wind.speed;
      console.log("wind", windValue);
      // set wind content into html
      $("#windValue").text(windValue);
      // pulls data for humidity
      var humValue = data.main.humidity;
      console.log("humidity", humValue);
      // set hum content into html
      $("#humValue").text(humValue);
      //changes the city value to city searched
      $("#cityValue").text(searchInput);

      //need lat and lon for UV per API
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var queryUrl2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=hourly,daily&appid=" +
        apiKey;

      //using JSON to get the UV by creating a function that fetches teh data
      $.getJSON(queryUrl2, function (data) {
        console.log(data);
        $("#uvValue").text(data.current.uvi);

        if (data.current.uvi <= 5) {
          $("#uvValue").css("background-color", "green")
        } else if (data.current.uvi >= 10) {
          $("#uvValue").css("background-color", "red")
        } else {
          $("#uvValue").css("background-color", "yellow")
        }


      });
    });

    //using JSON to get the 5 day forecast 
    $.getJSON(queryUrl3 + searchInput + "&appid=" + apiKey, function (data) {
      console.log(data);
      var day1 = data.list[4];
      var day2 = data.list[12];
      var day3 = data.list[20];
      var day4 = data.list[28];
      var day5 = data.list[36];
      console.log(day1);
      var iconCode = data.list[0].weather[0].icon;
      var iconCode1 = data.list[4].weather[0].icon;
      var iconCode2 = data.list[12].weather[0].icon;
      var iconCode3 = data.list[20].weather[0].icon;
      var iconCode4 = data.list[28].weather[0].icon;
      var iconCode5 = data.list[36].weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
      var iconUrl1 = "https://openweathermap.org/img/wn/" + iconCode1 + ".png";
      var iconUrl2 = "https://openweathermap.org/img/wn/" + iconCode2 + ".png";
      var iconUrl3 = "https://openweathermap.org/img/wn/" + iconCode3 + ".png";
      var iconUrl4 = "https://openweathermap.org/img/wn/" + iconCode4 + ".png";
      var iconUrl5 = "https://openweathermap.org/img/wn/" + iconCode5 + ".png";
      var temp1 = day1.main.temp - 273.15
      temp1 = parseInt(temp1 * 1.8 + 32)
      var temp2 = day2.main.temp - 273.15
      temp2 = parseInt(temp2 * 1.8 + 32)
      var temp3 = day3.main.temp - 273.15
      temp3 = parseInt(temp3 * 1.8 + 32)
      var temp4 = day4.main.temp - 273.15
      temp4 = parseInt(temp4 * 1.8 + 32)
      var temp5 = day5.main.temp - 273.15
      temp5 = parseInt(temp5 * 1.8 + 32)



      $("#date1").text(data.list[4].dt_txt.slice(0, -8));
      $("#date2").text(data.list[12].dt_txt.slice(0, -8));
      $("#date3").text(data.list[20].dt_txt.slice(0, -8));
      $("#date4").text(data.list[28].dt_txt.slice(0, -8));
      $("#date5").text(data.list[36].dt_txt.slice(0, -8));


      $("#tempValue1").text(temp1);
      $("#humValue1").text(day1.main.humidity);
      $("#tempValue2").text(temp2);
      $("#humValue2").text(day2.main.humidity);
      $("#tempValue3").text(temp3);
      $("#humValue3").text(day3.main.humidity);
      $("#tempValue4").text(temp4);
      $("#humValue4").text(day4.main.humidity);
      $("#tempValue5").text(temp5);
      $("#humValue5").text(day5.main.humidity);

      $("#icon").html("<img src=" + iconUrl + ">");
      $("#icon1").html("<img src=" + iconUrl1 + ">");
      $("#icon2").html("<img src=" + iconUrl2 + ">");
      $("#icon3").html("<img src=" + iconUrl3 + ">");
      $("#icon4").html("<img src=" + iconUrl4 + ">");
      $("#icon5").html("<img src=" + iconUrl5 + ">");
    });
  });
});


