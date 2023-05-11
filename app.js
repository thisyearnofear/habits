window.onload = function() {
  const activities = [
    { name: "Run", days: [], hours: [] }
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const habitChart = document.getElementById("habitChart").getContext("2d");

  let chart = new Chart(habitChart, {
    type: 'scatter',
    data: {
      datasets: [
        ...activities.map((activity, i) => ({
          label: activity.name + ' (Papa)',
          data: [],
          backgroundColor: `rgba(54, 162, 235, 0.5)`,
          borderColor: `rgba(54, 162, 235, 1)`,
        })),
        ...activities.map((activity, i) => ({
          label: activity.name + ' (You)',
          data: [],
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
        })),
      ],
    },
    options: {
      scales: {
        x: {
          type: 'category',
          labels: daysOfWeek,
        },
        y: {
          beginAtZero: true,
          max: 24,
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart) {
              const datasets = chart.data.datasets;
              const legendItems = chart.legend.legendItems || [];
              const legendLabels = [];

              datasets.forEach((dataset, i) => {
                const label = {
                  text: dataset.label,
                  fillStyle: dataset.backgroundColor,
                  hidden: !chart.isDatasetVisible(i),
                  index: i,
                  datasetIndex: i,
                };

                if (i >= activities.length) {
                  label.fillStyle = 'rgba(0, 0, 0, 0)';
                  label.pointStyle = 'circle';
                  label.borderWidth = 1;
                }

                if (legendItems[i]) {
                  legendItems[i].text = label.text;
                  legendItems[i].fillStyle = label.fillStyle;
                  legendItems[i].hidden = label.hidden;
                } else {
                  legendItems[i] = label;
                }

                legendLabels.push(legendItems[i]);
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
    },
  });

  function updateChartRealTime() {
    const userInputData = [
      { name: "Run", hours: [] },
    ];

    daysOfWeek.forEach((day, i) => {
      const inputElement = document.getElementById(day.toLowerCase());
      const inputValue = inputElement.value.trim();

      const activityData = {
        x: day,
        y: inputValue !== "" ? parseInt(inputValue) : null
      };

      userInputData[0].hours.push(activityData);
    });

    chart.data.datasets.forEach((dataset, i) => {
      if (i >= activities.length) {
        dataset.data = userInputData[i - activities.length].hours;
      }
    });

    chart.update();
  }

  document.querySelectorAll('.form-control').forEach(item => {
    item.addEventListener('input', updateChartRealTime);
    item.addEventListener('input', validateInput);
  });

  function validateInput() {
    const inputValue = parseInt(this.value);
    const maxHours = 24;

    if (isNaN(inputValue) || inputValue < 0 || inputValue > maxHours) {
      this.value = "";
    }
  }

  updateChartRealTime();
}
