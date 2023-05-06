// Select the form element
const form = document.querySelector('form');

// Add an event listener for form submission
form.addEventListener('submit', (event) => {

  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the habit name, date, and done status from the form fields
  const habitName = document.querySelector('#habitName').value;
  const habitDate = document.querySelector('#habitDate').value;
  const habitDone = document.querySelector('#habitDone').value;

  // Create a new habit object with the form data
  const newHabit = { name: habitName, date: habitDate, done: habitDone };

  // Add the new habit to local storage
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits.push(newHabit);
  localStorage.setItem('habits', JSON.stringify(habits));

  // Reset the form fields
  form.reset();

  // Reload the page to show the updated habit list
  location.reload();
});

// Load the list of habits from local storage and display them in a table
const habits = JSON.parse(localStorage.getItem('habits')) || [];
const tableBody = document.querySelector('#habitTable tbody');
habits.forEach((habit) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${habit.name}</td>
    <td>${habit.date}</td>
    <td>${habit.done}</td>
  `;
  tableBody.appendChild(row);
});

const habitTable = document.getElementById('habitTable');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form input values
  const name = document.getElementById('habitName').value;
  const date = document.getElementById('habitDate').value;
  const done = document.getElementById('habitDone').value;

  // Create new table row
  const newRow = document.createElement('tr');

  // Create table cells for each column
  const nameCell = document.createElement('td');
  nameCell.textContent = name;
  const dateCell = document.createElement('td');
  dateCell.textContent = date;
  const doneCell = document.createElement('td');
  doneCell.textContent = done;

  // Add cells to the row
  newRow.appendChild(nameCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(doneCell);

  // Add the row to the table
  habitTable.appendChild(newRow);
});

