const API_KEY = "QVjzHpfvp-ziMCgf1DV1";
// let currentBitcoinPrice;
let startDate = "";
let endDate = "";
let responseAsJson;
let xValues = [];
let yValues = [];

async function loadCourse() {
  //  let today = new Date();
  //  today.setDate(new Date().getDate() - 1);
  // let startDate = new Date().toISOString().split('T')[0];
  // let endDate = new Date().toISOString().split('T')[0];

  let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
  let response = await fetch(url);
  responseAsJson = await response.json();
  showBitcoinToday(responseAsJson);
  console.log("API answers:", responseAsJson);
}

// show bitcoin current price

function showBitcoinToday(responseAsJson) {
  let bitcoinToday = document.getElementById("bitcointoday");
  bitcoinToday.innerHTML = "";
  bitcoinToday.innerHTML = responseAsJson["dataset"]["data"][0][1];
}

// get start- and end dates

async function getDate() {
  startDate = document.getElementById("start-date").value;
  endDate = document.getElementById("end-date").value;
  await loadCourse();
  chartIt();
}

// chart

function chartIt() {
  setTimeout(() => {
    for (let i = 0; i < responseAsJson["dataset"]["data"].length; i++) {
      xValues.push(responseAsJson["dataset"]["data"][i][0]);
      yValues.push(responseAsJson["dataset"]["data"][i][1]);
    }

    const data = {
      labels: xValues,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: yValues,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  }, 100);
}
