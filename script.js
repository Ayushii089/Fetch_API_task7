const userList = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

// Function to fetch and display users
async function fetchUsers() {
  userList.innerHTML = "Loading...";
  errorMsg.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    errorMsg.textContent = "⚠️ Failed to fetch data. Please check your internet connection.";
    userList.innerHTML = "";
    console.error("Error:", error);
  }
}

// Function to display users
function displayUsers(users) {
  userList.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Address:</b> ${user.address.street}, ${user.address.city}</p>
    `;
    userList.appendChild(card);
  });
}

// Reload button functionality
reloadBtn.addEventListener("click", fetchUsers);

// Fetch users on first load
fetchUsers();
