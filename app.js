const activities = [
  { name: "Chess.com", days: 1, minutes: 30 },
  { name: "Duolingo", days: 1107, minutes: 15 },
  { name: "Strava", days: 2, minutes: 60 },
  { name: "Yousician", days: 3, minutes: 45 },
];

const habitTable = document.getElementById("habitTable");
const leaderboardTable = document.getElementById("leaderboardTableBody");

const habitChart = document.getElementById("habitChart").getContext("2d");

let chart = new Chart(habitChart, {
    type: 'bar',
    data: {
        labels: [], 
        datasets: [
            {
                label: 'Days in a row',
                data: [], 
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Average Minutes per Day',
                data: [], 
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart(userInputData) {
  chart.data.labels = [...activities, ...userInputData].map(activity => activity.name);
  chart.data.datasets[0].data = [...activities, ...userInputData].map(activity => activity.days);
  chart.data.datasets[1].data = [...activities, ...userInputData].map(activity => activity.minutes);
  chart.update();
}

function updateLeaderboard(userInputData) {
  const sortedData = [...activities, ...userInputData].sort((a, b) => b.days - a.days);
  leaderboardTable.innerHTML = "";
  sortedData.forEach(user => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const daysTd = document.createElement("td");
    nameTd.textContent = user.name;
    daysTd.textContent = user.days;
    tr.appendChild(nameTd);
    tr.appendChild(daysTd);
    leaderboardTable.appendChild(tr);
  });
}

function updateHabitTable(userInputData) {
  const tbody = document.getElementById('habitTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = "";
  userInputData.forEach(user => {
    const newRow = tbody.insertRow();
    const nameCell = newRow.insertCell(0);
    const daysCell = newRow.insertCell(1);
    nameCell.textContent = user.name;
    daysCell.textContent = user.days;
  });
}

document.querySelectorAll('.inputField').forEach(item => {
  item.addEventListener('input', updateAll)
});

function updateAll() {
  let chessDays = document.getElementById('chessDays').value;
  let chessMinutes = document.getElementById('chessMinutes').value;
  let duolingoDays = document.getElementById('duolingoDays').value;
  let duolingoMinutes = document.getElementById('duolingoMinutes').value;
  let stravaDays = document.getElementById('stravaDays').value;
  let stravaMinutes = document.getElementById('stravaMinutes').value;
  let yousicianDays = document.getElementById('yousicianDays').value;
    let yousicianMinutes = document.getElementById('yousicianMinutes').value;

  // Form the user input data
  const userInputData = [
    { name: "Chess.com", days: parseInt(chessDays), minutes: parseInt(chessMinutes) },
    { name: "Duolingo", days: parseInt(duolingoDays), minutes: parseInt(duolingoMinutes) },
    { name: "Strava", days: parseInt(stravaDays), minutes: parseInt(stravaMinutes) },
    { name: "Yousician", days: parseInt(yousicianDays), minutes: parseInt(yousicianMinutes) },
  ];

  // Update the table, chart and leaderboard with the user input data
  updateChart(userInputData);
  updateLeaderboard(userInputData);
  updateHabitTable(userInputData);

  // Clear the input fields after submission
  document.getElementById("chessDays").value = '';
  document.getElementById("chessMinutes").value = '';
  document.getElementById("duolingoDays").value = '';
  document.getElementById("duolingoMinutes").value = '';
  document.getElementById("stravaDays").value = '';
  document.getElementById("stravaMinutes").value = '';
  document.getElementById("yousicianDays").value = '';
  document.getElementById("yousicianMinutes").value = '';
}

updateChart([]);
updateLeaderboard([]);

