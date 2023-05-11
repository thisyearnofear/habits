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
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: function (chart) {
            const datasets = chart.data.datasets;
            const legendItems = chart.legend.legendItems;
            const legendLabels = [];

            datasets.forEach((dataset, i) => {
              const label = {
                text: dataset.label,
                fillStyle: dataset.backgroundColor,
                hidden: !chart.isDatasetVisible(i),
                index: i,
                datasetIndex: i,
              };

              if (i < activities.length) {
                label.text += ' (Papa)';
              } else {
                label.text += ' (You)';
                label.fillStyle = 'rgba(0, 0, 0, 0)';
                label.pointStyle = 'circle';
                label.borderWidth = 1;
              }

              legendItems[i] = label;
              legendLabels.push(label);
            });

            return legendLabels;
          },
          font: {
            size: 12,
          },
          padding: 10,
          boxWidth: 12,
          usePointStyle: true,
        },
      },
    },
  }
});

document.querySelectorAll('.form-control').forEach(item => {
  item.addEventListener('input', updateChartRealTime);
  item.addEventListener('input', validateInput);
});

function validateInput() {
  const maxDays = parseInt(this.getAttribute('max'));
  const maxHours = parseInt(this.nextElementSibling.getAttribute('max'));
  if (parseInt(this.value) > maxDays) {
    this.value = maxDays;
  }
  if (parseInt(this.nextElementSibling.value) > maxHours) {
    this.nextElementSibling.value = maxHours;
  }
}

function updateChartRealTime() { 
const userInputData = [
  { name: "Chess", days: document.getElementById('chessDays').value, hours: document.getElementById('chessHours').value },
  { name: "Duolingo", days: document.getElementById('duolingoDays').value, hours: document.getElementById('duolingoHours').value },
  { name: "Strava", days: document.getElementById('stravaDays').value, hours: document.getElementById('stravaHours').value },
  { name: "Yousician", days: document.getElementById('yousicianDays').value, hours: document.getElementById('yousicianHours').value },
];

chart.data.datasets.forEach((dataset, i) => {
  if (i >= activities.length) { // Clear and update only user input datasets
    dataset.data = []; // Clear existing data
    const userInput = userInputData[i - activities.length]; // Get the corresponding user input
    if (userInput.days && userInput.hours) { // Check if both fields are filled
      dataset.data.push({ x: parseInt(userInput.days), y: parseInt(userInput.hours) });
    }
  }
});

chart.update();
}

window.onload = function() {
  updateChartRealTime();
};
