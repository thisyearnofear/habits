window.onload = function() {
  const activities = [
    { name: "Chess", days: [], minutes: [] }
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const masterData = [
    { day: "Monday", minutes: 10 },
    { day: "Tuesday", minutes: 15 },
    { day: "Wednesday", minutes: 20 },
    { day: "Thursday", minutes: 10 },
    { day: "Friday", minutes: 15 },
    { day: "Saturday", minutes: 20 },
    { day: "Sunday", minutes: 20 },
     ];
  
  // Convert the master data to the required format for the chart
  masterData.forEach(data => {
    const dayIndex = daysOfWeek.indexOf(data.day);
    if (dayIndex !== -1) {
      activities[0].minutes[dayIndex] = data.minutes;
    }
  });

  const habitChart = document.getElementById("habitChart").getContext("2d");

  let chart = new Chart(habitChart, {
    type: 'scatter',
    data: {
      labels: daysOfWeek,
      datasets: [
        ...activities.map((activity, i) => ({
                  label: 'Papa',
          data: [10, 15, 20, 10, 15, 20, 25],
          backgroundColor: 'rgba(46, 134, 193, 1)',
          borderColor: 'rgba(46, 134, 193, 1)',
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: true, // Add this line to show the line
        })),
        ...activities.map((activity, i) => ({
          label: activity.name + ' (You)',
          data: [],
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          showLine: true,
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
          max: 60,
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
      { name: "Chess", minutes: [] },
    ];

    daysOfWeek.forEach((day, i) => {
      const inputElement = document.getElementById(day.toLowerCase());
      const inputValue = inputElement.value.trim();

      const activityData = {
        x: day,
        y: inputValue !== "" ? parseInt(inputValue) : null
      };

      userInputData[0].minutes.push(activityData);
    });

    chart.data.datasets.forEach((dataset, i) => {
      if (i >= activities.length) {
        dataset.data = userInputData[i - activities.length].minutes;
      }
    });

    chart.update();
  }

  document.querySelectorAll('.form-control').forEach(item => {
    item.addEventListener('input', updateChartRealTime);
    item.addEventListener('input', validateInput);
    item.addEventListener('input', calculateTotalMinutes);
  });

  function calculateTotalMinutes() {
    const dateInputs = document.querySelectorAll('.form-control:not(#runningHours)');
    let totalMinutes = 0;

    dateInputs.forEach(input => {
      if (input.value !== '') {
        totalMinutes += parseInt(input.value);
      }
    });

    document.getElementById('runningHours').value = totalMinutes;
  }

  function validateInput() {
    const inputValue = parseInt(this.value);
      const maxMinutes = 60;

    if (isNaN(inputValue) || inputValue < 0 || inputValue > maxMinutes) {
      this.value = "";
    }
  }

  updateChartRealTime();
}

