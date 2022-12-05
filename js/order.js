const orderList = document.querySelector(".order-list");
const orderTemplate = document.querySelector(".order-template").content;
const loginToken = window.localStorage.getItem("tokenLogin");
const regToken = window.localStorage.getItem("token");

if (!regToken) {
  window.location.reload();
  window.location.pathname = "register.html";
}

if (!loginToken) {
  window.location.reload();
  window.location.pathname = "login.html";
}

fetch("http://192.168.0.148:5000/order", {
  headers: {
    "Content-Type": "application/json",
    Authorization: loginToken,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));
