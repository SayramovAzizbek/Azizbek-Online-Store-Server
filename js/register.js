const registerForm = document.querySelector(".register-form");
const registerNameInput = document.querySelector(".register-name");
const registerPhoneInput = document.querySelector(".register-phone");
const registerEmailInput = document.querySelector(".register-email");
const registerPasswordInput = document.querySelector(".register-password");

registerForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let registerNameInputValue = registerNameInput.value;
  let registerPhoneInputValue = registerPhoneInput.value;
  let registerEmailInputValue = registerEmailInput.value;
  let registerPasswordInputValue = registerPasswordInput.value;

  fetch("http://192.168.0.106:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: registerNameInputValue,
      phone: registerPhoneInputValue,
      email: registerEmailInputValue,
      password: registerPasswordInputValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      window.localStorage.setItem("token", data.token);
      window.location.pathname = "index.html";
    })
    .catch((err) => {
      window.location.reload();
      window.location.pathname = "register.html";
    });
});
