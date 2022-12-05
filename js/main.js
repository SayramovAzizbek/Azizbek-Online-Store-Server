const productList = document.querySelector(".product-list");
let productTemplate = document.querySelector(".product-template").content;
const loginToken = window.localStorage.getItem("tokenLogin");
const regToken = window.localStorage.getItem("token");

if (!regToken) {
  window.location.pathname = "register.html";
  window.location.reload();
}

if (!loginToken) {
  window.location.reload();
  window.location.pathname = "login.html";
}

async function mainProductRender() {
  try {
    const res = await fetch("http://192.168.0.105:5000/product", {
      headers: {
        Authorization: loginToken,
      },
    });
    let data = await res.json();

    let productFragment = document.createDocumentFragment();
    data.forEach((item) => {
      let cloneProductTemplate = productTemplate.cloneNode(true);
      cloneProductTemplate.querySelector(".product-img").src = `http://192.168.0.105:5000/${item.product_img}`;
      cloneProductTemplate.querySelector(".product-title").textContent = item.product_name;
      cloneProductTemplate.querySelector(".product-desc").textContent = item.product_desc;
      cloneProductTemplate.querySelector(".product-price").textContent = `${item.product_price}$`;
      cloneProductTemplate.querySelector(".product-buy-btn").dataset.savedProductId = item.id;

      productFragment.appendChild(cloneProductTemplate);
    });
    productList.appendChild(productFragment);
  } catch (error) {
    console.log(error.message);
  }
}
mainProductRender();

function orderPost(orderID) {
  fetch("http://192.168.0.105:5000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: loginToken,
    },
    body: JSON.stringify({
      product_id: orderID,
    }),
  });
}

let orderedList = [];
productList.addEventListener("click", function (evt) {
  if (evt.target.matches(".product-buy-btn")) {
    const cardSavedProductId = evt.target.dataset.savedProductId;

    if (!orderedList.includes(cardSavedProductId)) {
      orderedList.push(cardSavedProductId);
    }
    orderPost(cardSavedProductId);
  }
});
