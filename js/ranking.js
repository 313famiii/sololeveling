window.addEventListener('load', () => {
  const existingData = JSON.parse(localStorage.getItem('gameData')) || [];

  const userTable = document.querySelector('.user-table tbody');
  userTable.innerHTML = ''; 

  const sortedData = existingData.sort((a, b) => a.time - b.time);

  const topTenData = sortedData.slice(0, 10);

  topTenData.forEach((data, index) => {
    const newRow = userTable.insertRow();
    const rankCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const timeCell = newRow.insertCell(2);
    rankCell.textContent = index + 1; 
    nameCell.textContent = data.name;
    timeCell.textContent = `${data.time}s`;
  });
});

const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
  const userTable = document.querySelector('.user-table tbody');
  userTable.innerHTML = ''; 
  localStorage.removeItem('gameData'); 
});