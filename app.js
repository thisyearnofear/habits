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
  item.addEventListener('input', updateAll)
});


function updateAll() {
  let chessDays = document.getElementById('chessDays').value;
  let chessHours = document.getElementById('chessHours').value;
  let duolingoDays = document.getElementById('duolingoDays').value;
  let duolingoHours = document.getElementById('duolingoHours').value;
  let stravaDays = document.getElementById('stravaDays').value;
  let stravaHours = document.getElementById('stravaHours').value;
  let yousicianDays = document.getElementById('yousicianDays').value;
  let yousicianHours = document.getElementById('yousicianHours').value;

  const userInputData = [
    { name: "Chess", days: chessDays, hours: chessHours },
    { name: "Duolingo", days: duolingoDays, hours: duolingoHours },
    { name: "Strava", days: stravaDays, hours: stravaHours },
    { name: "Yousician", days: yousicianDays, hours: yousicianHours},
  ];

  userInputData.forEach((user, i) => {
    if (user.days && user.hours) { // Check if both fields are filled
      let index = chart.data.datasets.findIndex(dataset => dataset.label === user.name);
      if (index !== -1) {
        chart.data.datasets[index].data.push({ x: parseInt(user.days), y: parseInt(user.hours) });
      } else {
        chart.data.datasets.push({
          label: user.name,
          data: [{ x: parseInt(user.days), y: parseInt(user.hours) }],
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

