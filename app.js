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

  const userInputData = [
    { name: "Chess", days: parseInt(chessDays), minutes: parseInt(chessMinutes) },
    { name: "Duolingo", days: parseInt(duolingoDays), minutes: parseInt(duolingoMinutes) },
    { name: "Strava", days: parseInt(stravaDays), minutes: parseInt(stravaMinutes) },
    { name: "Yousician", days: parseInt(yousicianDays), minutes: parseInt(yousicianMinutes) },
  ];

  userInputData.forEach((user, i) => {
    let index = chart.data.datasets.findIndex(dataset => dataset.label === user.name);
    if (index !== -1) {
      chart.data.datasets[index].data.push({ x: user.days, y: user.minutes });
    } else {
      chart.data.datasets.push({
        label: user.name,
        data: [{ x: user.days, y: user.minutes }],
        backgroundColor: `hsl(${i * 90}, 70%, 50%)`,
        borderColor: `hsl(${i * 90}, 70%, 50%)`,
      });
    }
  });

  chart.update();

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

updateAll();
