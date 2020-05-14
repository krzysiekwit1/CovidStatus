showCountries();
$(document).ready(function () {
  init();
  function init() {
    var url = "https://api.covid19api.com/summary";

    var dataCases = "";
    var dataDeaths = "";
    var dataRecovered = "";

    $.get(url, function (data) {
      console.log(data.countries);

      dataCases = `Total Cases : ${data.Global.TotalConfirmed}`;
      dataDeaths = `Total Deaths: : ${data.Global.TotalDeaths}`;
      dataRecovered = `Total Recovered: : ${data.Global.TotalRecovered}`;

      $("#dataCases").html(dataCases);
      $("#dataDeaths").html(dataDeaths);
      $("#dataRecovered").html(dataRecovered);
    });
  }
});
//Function coonected to choose country btn
function chooseCountry(country, choosedCanvas) {
  var choosedCountry = $(country).find(":selected").text();
  var urlSelected =
    "https://api.covid19api.com/total/country/" +
    choosedCountry +
    "/status/confirmed";

  // save downloaded data to local arrays and cut some extra letters from dates from covid 19 api
  $.get(urlSelected, function (data) {
    var cases = [];
    var date = [];

    for (var i = 0; i < data.length; ++i) {
      cases[i] = data[i].Cases;
      date[i] = data[i].Date;
      date[i] = date[i].substr(0, 10);
      console.log(date[i]);
    }
    //Drawing chart

    var ctx = document.getElementById(choosedCanvas).getContext("2d");
    var chart1 = new Chart(ctx, {
      type: "bar",

      // The data for our dataset

      data: {
        labels: date,
        datasets: [
          {
            label: choosedCountry + " Cases/Days",
            backgroundColor: "black",
            borderColor: "",
            data: cases,
          },
        ],
      },

      // Configuration
      options: {},
    });
  });
}
//Function for comparing both countries data realy similar to first one
function compareCountries(country1, country2, choosedCanvas) {
  //FIRST COUNTRY
  var choosedCountry1 = $(country1).find(":selected").text();
  var urlSelected1 =
    "https://api.covid19api.com/total/country/" +
    choosedCountry1 +
    "/status/confirmed";
  //SECOND COUNTRY
  var choosedCountry2 = $(country2).find(":selected").text();
  var urlSelected2 =
    "https://api.covid19api.com/total/country/" +
    choosedCountry2 +
    "/status/confirmed";
  $.get(urlSelected1, function (data1) {
    var cases1 = [];
    var cases2 = [];
    var date = [];

    for (var i = 0; i < data1.length; ++i) {
      cases1[i] = data1[i].Cases;
      date[i] = data1[i].Date;
      date[i] = date[i].substr(0, 10);
    }
    $.get(urlSelected2, function (data2) {
      for (var i = 0; i < data2.length; ++i) {
        cases2[i] = data2[i].Cases;
      }

      if (chart != null) {
        chart.destroy();
      }
      var ctx = document.getElementById(choosedCanvas).getContext("2d");
      var chart = new Chart(ctx, {
        type: "bar",

        // The data for our chart

        data: {
          labels: date,
          datasets: [
            {
              label: choosedCountry1 + " Cases/Days",
              backgroundColor: "red",
              borderColor: "rgb(255, 99, 132)",
              data: cases1,
            },
            {
              label: choosedCountry2 + " Cases/Days",
              backgroundColor: "green",
              borderColor: "rgb(255, 99, 132)",
              data: cases2,
            },
          ],
        },

        // Configuration
        options: {},
      });
    });
  });
}
