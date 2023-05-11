const activities = [
  { name: "Chess", days: 1, minutes: 30 },
  { name: "Duolingo", days: 1107, minutes: 15 },
  { name: "Strava", days: 2, minutes: 60 },
  { name: "Yousician", days: 3, minutes: 45 },
];

const habitChart = document.getElementById("habitChart").getContext("2d");

let chart = new Chart(habitChart, {
    type: 'scatter',
    data: {
        datasets: activities.map((activity, i) => ({
            label: activity.name,
            data: [{ x: activity.days, y: activity.minutes }],
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
                    text: 'Days in the last week'
                },
                beginAtZero: true
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Total minutes in last week'
                },
                beginAtZero: true
            }
        }
    }
});

document.querySelectorAll('.form-control').forEach(item => {
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

  const userInputData = [
    { name: "Chess", days: chessDays, minutes: chessMinutes },
    { name: "Duolingo", days: duolingoDays, minutes: duolingoMinutes },
    { name: "Strava", days: stravaDays, minutes: stravaMinutes },
    { name: "Yousician", days: yousicianDays, minutes: yousicianMinutes },
  ];

  userInputData.forEach((user, i) => {
    if (user.days && user.minutes) { // Check if both fields are filled
      let index = chart.data.datasets.findIndex(dataset => dataset.label === user.name);
      if (index !== -1) {
        chart.data.datasets[index].data.push({ x: parseInt(user.days), y: parseInt(user.minutes) });
      } else {
        chart.data.datasets.push({
          label: user.name,
          data: [{ x: parseInt(user.days), y: parseInt(user.minutes) }],
          backgroundColor: `hsl(${i * 90}, 70%, 50%)`,
          borderColor: `hsl(${i * 90}, 70%, 50%)`,
        });
      }
      chart.update();
    }
  });
}

window.onload = function() {
  updateAll();
};

