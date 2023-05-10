const activities = [
  { name: "Chess.com", days: 1 },
  { name: "Duolingo", days: 1107 },
  { name: "Strava", days: 2 },
  { name: "Yousician", days: 3 },
];

const habitTable = document.getElementById("habitTable");
const leaderboardTable = document.getElementById("leaderboardTableBody");

// Initialize the chart outside the event
const habitChart = document.getElementById("habitChart").getContext("2d");
let chart = new Chart(habitChart, {
  type: 'line', // or whatever type of chart you want
  data: {}, // empty data set to be filled later
  options: {} // add any options you want for your chart
});

// Function to update the chart
function updateChart(userInputData) {
  chart.data.labels = [...activities, ...userInputData].map(activity => activity.name);
  chart.data.datasets[0].data = [...activities, ...userInputData].map(activity => activity.days);
  chart.update();
}

// Function to update the leaderboard
function updateLeaderboard(userInputData) {
  const sortedData = [...activities, ...userInputData].sort((a, b) => b.days - a.days);
  // Clear existing leaderboard content
  leaderboardTable.innerHTML = "";
  // Add new leaderboard content
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

// Function to update habit table
function updateHabitTable(userInputData) {
  const tbody = document.getElementById('habitTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = ""; // Clear existing habit table content
  userInputData.forEach(user => {
    const newRow = tbody.insertRow();
    const nameCell = newRow.insertCell(0);
    const daysCell = newRow.insertCell(1);
    nameCell.textContent = user.name;
    daysCell.textContent = user.days;
  });
}

// Form submission event
document.getElementById("habitForm").addEventListener("submit", function (e) {
  // Prevent form from submitting normally
  e.preventDefault();

  // Form processing code goes here
  const chessDays = parseInt(document.getElementById("chessDays").value) || 0;
  const duolingoDays = parseInt(document.getElementById("duolingoDays").value) || 0;
  const stravaDays = parseInt(document.getElementById("stravaDays").value) || 0;
  const yousicianDays = parseInt(document.getElementById("yousicianDays").value) || 0;

 const userInputData = [
  { name: "Chess.com", days: chessDays },
  { name: "Duolingo", days: duolingoDays },
  { name: "Strava", days: stravaDays },
  { name: "Yousician", days: yousicianDays },
];

// Update the table, chart and leaderboard with the user input data
updateChart(userInputData);
updateLeaderboard(userInputData);
updateHabitTable(userInputData);

// Clear the input fields after submission
document.getElementById("chessDays").value = '';
document.getElementById("duolingoDays").value = '';
document.getElementById("stravaDays").value = '';
document.getElementById("yousicianDays").value = '';
});

