const adminForm = document.querySelector(".admin-form");
const adminProductInputName = document.querySelector(".product-name");
const adminProductInputDesc = document.querySelector(".product-desc");
const adminProductInputPrice = document.querySelector(".product-price");
const adminProductInputFile = document.querySelector(".profuct-img");

const adminProdcutChangeModalForm = document.querySelector(
  ".admin-product-change-form"
);
const adminProductChangeInputName = document.querySelector(
  ".admin-change-product-name"
);
const adminProductChangeInputDesc = document.querySelector(
  ".admin-change-product-desc"
);
const adminProductChangeInputPrice = document.querySelector(
  ".admin-change-product-price"
);
const adminProductChangeInputImg = document.querySelector(
  ".admin-change-product-img"
);

const productAdminList = document.querySelector(".admin-product-list");
let productAdminTemplate = document.querySelector(
  ".admin-product-template"
).content;

let adminProductModal = document.querySelector(".admin-product-modal");
let adminProdcutModalCloseBtn = document.querySelector(
  ".admin-change-close-btn"
);
let adminProdcutModalOpenModal = document.querySelector(
  ".admin-change-product-btn"
);

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

// const adminLocalStorage = window.localStorage.setItem("adminToken", data.token)

adminForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const productData = new FormData(adminForm);

  productData.append("product_name", adminProductInputName.value);
  productData.append("product_desc", adminProductInputDesc.value);
  productData.append("product_price", adminProductInputPrice.value);
  productData.append(
    "product_img",
    adminProductInputFile.files[0],
    "image.jpeg"
  );

  for (item of productData) {
    console.log(item[0], item[1]);
  }

  fetch("http://192.168.0.106:5000/product", {
    method: "POST",
    headers: {
      Authorization: loginToken,
    },
    body: productData,
  });

  setTimeout(() => {
    adminProductRender();
  }, 1000);
});

// ! GET API
async function adminProductRender() {
  productAdminList.innerHTML = "";
  try {
    const res = await fetch("http://192.168.0.106:5000/product", {
      headers: {
        Authorization: loginToken,
      },
    });
    const data = await res.json();

    let productAdminFragment = document.createDocumentFragment();
    data.forEach((item) => {
      let cloneProductAdminTemplate = productAdminTemplate.cloneNode(true);

      cloneProductAdminTemplate.querySelector(
        ".admin-product-img"
      ).src = `http://192.168.0.106:5000/${item.product_img}`;
      cloneProductAdminTemplate.querySelector(
        ".admin-product-title"
      ).textContent = item.product_name;
      cloneProductAdminTemplate.querySelector(
        ".admin-product-desc"
      ).textContent = item.product_desc;
      cloneProductAdminTemplate.querySelector(
        ".admin-product-price"
      ).textContent = `${item.product_price}$`;
      cloneProductAdminTemplate.querySelector(
        ".admin-product-edit-btn"
      ).textContent = `Edit`;
      cloneProductAdminTemplate.querySelector(
        ".admin-product-edit-btn"
      ).dataset.editId = item.id;
      cloneProductAdminTemplate.querySelector(
        ".admin-product-delete-btn"
      ).dataset.deleteId = item.id;

      productAdminFragment.appendChild(cloneProductAdminTemplate);
    });
    productAdminList.appendChild(productAdminFragment);
  } catch (error) {
    console.log(error.message);
  }
}

// ! Delete
function deleteProduct(id) {
  fetch(`http://192.168.0.106:5000/product/` + id, {
    method: "DELETE",
    headers: {
      Authorization: loginToken,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

productAdminList.addEventListener("click", (evt) => {
  if (evt.target.matches(".admin-product-delete-btn")) {
    const deleteBtnId = evt.target.dataset.deleteId;
    deleteProduct(deleteBtnId);
    adminProductRender();

    setTimeout(() => {
      adminProductRender();
    }, 1000);
  }
});

// ! Edit
// function editProduct(editId) {
//   let formEditData = new FormData();

//   formEditData.append("product_name", adminProductInputName.value.trim());
//   formEditData.append("product_desc", adminProductInputDesc.value.trim());
//   formEditData.append("product_img", adminProductInputFile.files[0]);
//   formEditData.append("product_price", adminProductInputPrice.value.trim());

//   fetch(`http://192.168.5.225:5000/product/${editId}`, {
//     method: "PUT",
//     headers: {
//       Authorization: loginToken,
//     },
//     body: formEditData,
//   });
// }

function editModalProduct(editId) {
  let formEditModalData = new FormData();

  formEditModalData.append(
    "product_name",
    adminProductChangeInputName.value.trim()
  );
  formEditModalData.append(
    "product_desc",
    adminProductChangeInputDesc.value.trim()
  );
  formEditModalData.append("product_img", adminProductChangeInputImg.files[0]);
  formEditModalData.append(
    "product_price",
    adminProductChangeInputPrice.value.trim()
  );

  fetch(`http://192.168.0.106:5000/product/${editId}`, {
    method: "PUT",
    headers: {
      Authorization: loginToken,
    },
    body: formEditModalData,
  });
}

let editBtnId;
productAdminList.addEventListener("click", (evt) => {
  if (evt.target.matches(".admin-product-edit-btn")) {
    editBtnId = evt.target.dataset.editId;
    // editProduct(editBtnId);
    adminProductModal.classList.add("admin-product-modal--on");
    adminProductModal.querySelector(
      ".admin-change-product-btn"
    ).dataset.modalId = editBtnId;
  }
});

adminProdcutChangeModalForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let modalOpenId = evt.target.querySelector(".admin-change-product-btn")
    .dataset.modalId;
  //   editProduct(modalOpenId);
  editModalProduct(modalOpenId);
  adminProductModal.classList.remove("admin-product-modal--on");
  // window.location.reload();
});

adminProdcutModalCloseBtn.addEventListener("click", () => {
  adminProductModal.classList.remove("admin-product-modal--on");
});

adminProductRender();
