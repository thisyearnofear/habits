const activities = [
  { name: "Chess", days: 5, hours: 7 },
  { name: "Duolingo", days: 7, hours: 1 },
  { name: "Strava", days: 1, hours: 1 },
  { name: "Yousician", days: 3, hours: 1 },
];

const habitChart = document.getElementById("habitChart").getContext("2d");

Chart.plugins.register({
  afterDatasetsDraw: function(chart) {
    const ctx = chart.ctx;
    const datasets = chart.data.datasets;

    datasets.forEach((dataset, i) => {
      if (i >= activities.length) {
        const meta = chart.getDatasetMeta(i);
        const radius = meta.pointStyle === 'cross' ? 8 : chart.config.options.elements.point.radius;
        const borderWidth = meta.pointStyle === 'cross' ? 2 : chart.config.options.elements.point.borderWidth;

        ctx.save();
        ctx.fillStyle = dataset.backgroundColor;
        ctx.strokeStyle = dataset.borderColor;
        ctx.lineWidth = borderWidth;

        meta.data.forEach((element, index) => {
          const dataPoint = dataset.data[index];
          const x = element.x;
          const y = element.y;

          if (x !== null && y !== null && element.skip !== true) {
            ctx.beginPath();
            if (meta.pointStyle === 'cross') {
              ctx.moveTo(x - radius, y - radius);
              ctx.lineTo(x + radius, y + radius);
              ctx.moveTo(x - radius, y + radius);
              ctx.lineTo(x + radius, y - radius);
            } else {
              ctx.arc(x, y, radius, 0, Math.PI * 2);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        });

        ctx.restore();
      }
    });
  }
});

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
    elements: {
      point: {
        radius: 5,
        borderWidth: 1
      }
    }
  }
});

document.querySelectorAll('.form-control').forEach(item => {
  item.addEventListener('input', updateChartRealTime);
});

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

  // Update legend labels
  chart.options.plugins.legend.labels.generateLabels = function (chart) {
    const datasets = chart.data.datasets;
    const legendItems = chart.legend.legendItems;
    const legendLabels = [];

    datasets.forEach((dataset, i) => {
      const label = {
        text: `${dataset.label} (${i < activities.length ? 'Papa' : 'You'})`,
        fillStyle: dataset.backgroundColor,
        strokeStyle: dataset.borderColor,
        lineWidth: dataset.borderWidth,
        hidden: !chart.isDatasetVisible(i),
        index: i,
        datasetIndex: i,
      };
      legendItems[i] = label;
      legendLabels.push(label);
    });

    return legendLabels;
  };

  chart.update();
}

window.onload = function() {
  updateChartRealTime();
};
