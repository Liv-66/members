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
      .then((response) => {
        showAlert("success", "登入成功！");
        window.setTimeout(() => {
          location.assign("/account");
        }, 1000);
      })
      .catch((error) => {
        showAlert("error", "姓名或身分證錯誤");
      });
  });
}

if (settingForm) {
  settingForm.addEventListener("submit", (el) => {
    el.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const job = document.getElementById("job").value;
    const education = document.getElementById("education").value;
    axios
      .patch("/users/update", { name, email, phone, address, job, education })
      .then((res) => {
        showAlert("success", "更新成功！");
        window.setTimeout(() => {
          location.reload(true);
        }, 1000);
      })
      .catch((error) => {
        if ((error.message = "Request failed with status code 500")) {
          showAlert("error", "E-mail格式錯誤");
        } else showAlert("error", error);
      });
  });
}
