const loginForm = document.querySelector(".login-form");
const loginEmailInput = document.querySelector(".login-email");
const loginPasswordInput = document.querySelector(".login-password");

const regToken = window.localStorage.getItem("token");

if (!regToken) {
  window.location.reload();
  window.location.pathname = "register.html";
}

loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let loginEmailInputValue = loginEmailInput.value;
  let loginPasswordInputValue = loginPasswordInput.value;

  fetch("http://192.168.0.148:5000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmailInputValue,
      password: loginPasswordInputValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      window.localStorage.setItem("tokenLogin", data.token);
      window.location.pathname = "index.html";
    })
    .catch((err) => {
      window.location.reload();
      window.location.pathname = "login.html";
    });
});
