window.onload = function() {
  const activities = [
    { name: "Language", days: [], minutes: [] }
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const habitChart = document.getElementById("habitChart").getContext("2d");

  let chart = new Chart(habitChart, {
    type: 'scatter',
    data: {
      labels: daysOfWeek,
      datasets: [
        ...activities.map((activity, i) => ({
          label: 'Duolingo',
          data: [10, 15, 20, 10, 15, 20, 25],
          backgroundColor: 'rgba(46, 134, 193, 1)',
          borderColor: 'rgba(46, 134, 193, 1)',
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: true,
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
              // Legend label generation code
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
      { name: "Language", minutes: [] },
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
    const timeInputs = document.querySelectorAll('.form-control:not(#languageMinutes)');
    let totalMinutes = 0;

    timeInputs.forEach(input => {
      if (input.value !== '') {
        totalMinutes += parseInt(input.value);
      }
    });

    document.getElementById('languageMinutes').value = totalMinutes;
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
