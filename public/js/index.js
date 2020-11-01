import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alert";
// import { login } from "./login";

const loninForm = document.querySelector(".form--login");
const settingForm = document.querySelector(".form-user-data");

if (loninForm) {
  loninForm.addEventListener("submit", (el) => {
    el.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    axios
      .post("/users/login", { name, password })
      .then(function (response) {
        showAlert('success', 'Logged In Successfully!');
        window.setTimeout(() => {
          location.assign('/users/account');
        }, 1000);
        console.log(response);

      })
      .catch(function (error) {
        showAlert('error', '錯誤');
        console.log(error);
      });
  });
}
