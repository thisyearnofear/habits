const activities = [
  { name: "Chess", days: 5, hours: 7 },
  { name: "Duolingo", days: 7, hours: 1 },
  { name: "Strava", days: 1, hours: 1 },
  { name: "Yousician", days: 3, hours: 1 },
];

const habitChart = document.getElementById("habitChart").getContext("2d");

let chart = new Chart(habitChart, {
    type: 'scatter',
    data: {
        datasets: activities.map((activity, i) => ({
            label: activity.name,
            data: [{ x: activity.days, y: activity.hours }],
            backgroundColor: `hsl(${i * 90}, 70%, 50%)`,
            borderColor: `hsl(${i * 90}, 70%, 50%)`,
        })),
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Days in last week'
                },
                beginAtZero: true
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Hours in last week'
                },
                beginAtZero: true
            }
        }
    }
});

document.querySelectorAll('.form-control').forEach(item => {
  item.addEventListener('input', updateChartRealTime);
});

function updateChartRealTime() {
  chart.data.datasets.forEach(dataset => {
    dataset.data = []; // Clear existing data
    dataset.pointStyle = 'circle'; // Set pointStyle to 'circle' for default shape (dots)
  });

  const userInputData = [
    { name: "Chess", days: document.getElementById('chessDays').value, hours: document.getElementById('chessHours').value },
    { name: "Duolingo", days: document.getElementById('duolingoDays').value, hours: document.getElementById('duolingoHours').value },
    { name: "Strava", days: document.getElementById('stravaDays').value, hours: document.getElementById('stravaHours').value },
    { name: "Yousician", days: document.getElementById('yousicianDays').value, hours: document.getElementById('yousicianHours').value },
  ];

  userInputData.forEach((user, i) => {
    if (user.days && user.hours) { // Check if both fields are filled
      chart.data.datasets.push({
        label: `${user.name} (You)`, // Include " (You)" in the legend label
        data: [{ x: parseInt(user.days), y: parseInt(user.hours) }],
        backgroundColor: `hsl(${i * 90}, 70%, 50%)`,
        borderColor: `hsl(${i * 90}, 70%, 50%)`,
        pointStyle: 'cross', // Set pointStyle to 'cross' for X shape
      });
    }
  });

  chart.update();
}

window.onload = function() {
  updateChartRealTime();
};

