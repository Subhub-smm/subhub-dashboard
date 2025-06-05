
let token = "";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://your-backend-url.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        token = data.token;
        document.getElementById("user-name").innerText = username;
        document.querySelector(".auth").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
      } else {
        alert(data.message || "Login failed");
      }
    });
}

function placeOrder() {
  const service = document.getElementById("service").value;
  const link = document.getElementById("link").value;
  const quantity = document.getElementById("quantity").value;

  fetch("https://your-backend-url.onrender.com/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, service, link, quantity }),
  })
    .then(res => res.json())
    .then(data => alert(data.message));
}

function fetchOrders() {
  fetch("https://your-backend-url.onrender.com/order-history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("orders-list");
      list.innerHTML = "";
      data.forEach(order => {
        const li = document.createElement("li");
        li.innerText = `${order.service} - ${order.quantity} - ${order.status}`;
        list.appendChild(li);
      });
    });
}
