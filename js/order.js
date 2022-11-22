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

// let orderFragment = document.createDocumentFragment();
// let cloneOrderTemplate = orderTemplate.cloneNode(true);
// productList.addEventListener("click", (evt) => {
//   if (evt.target.matches(".product-buy-btn")) {
//     let savedProductItem = evt.target.dataset.savedProductId;
//   }
// });

fetch("http://192.168.0.106:5000/order", {
  headers: {
    "Content-Type": "application/json",
    Authorization: loginToken,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));
