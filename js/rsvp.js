function initRSVPForm() {
  const form = document.getElementById("rsvp-form");
  const success = document.getElementById("success-message");

  if (!form) return;

  // Розкоментити при необхідності
  /*
if (localStorage.getItem("rsvpSubmitted") === "true") {
form.style.display = "none";
success.style.display = "block";
success.innerText = "Ви вже надіслали відповідь 🤍";
return;
}
*/

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    sendRSVP(data);
  });

  document.querySelectorAll(".custom-select").forEach((select) => {
    const selected = select.querySelector(".select-selected");
    const items = select.querySelector(".select-items");
    const hiddenInput = select.querySelector("input");
    selected.addEventListener("click", () => {
      select.classList.toggle("active");
    });

    items.querySelectorAll("div").forEach((option) => {
      option.addEventListener("click", () => {
        selected.innerText = option.innerText;
        hiddenInput.value = option.dataset.value;
        select.classList.remove("active");

        if (hiddenInput.name === "withPartner") {
          const partnerField = document.getElementById("partner-field");

          if (option.dataset.value === "Так") {
            partnerField.style.display = "block";
            partnerField.querySelector("input").required = true;
          } else {
            partnerField.style.display = "none";
            partnerField.querySelector("input").required = false;
            partnerField.querySelector("input").value = "";
          }
        }
        if (hiddenInput.name === "attendance") {
          const details = document.getElementById("attendance-details");

          if (option.dataset.value.includes("Так")) {
            details.style.display = "flex";
          } else {
            details.style.display = "none";

            document.getElementById("partner-field").style.display = "none";
          }
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        select.classList.remove("active");
      }
    });
  });
}

function sendRSVP(data) {
  const button = document.querySelector("#rsvp-form btn-cta");

  button.disabled = true;
  button.innerText = "Відправляємо...";

  fetch(
    "https://script.google.com/macros/s/AKfycbz904IfjSY0r8qZW_MUOOkvkNle4Oj7ivnRAESiB7CmviggUj5ooFFxiRNg2NgDfPx6Eg/exec",
    {
      method: "POST",
      body: data,
      mode: "no-cors",
    },
  )
    .then(() => {
      localStorage.setItem("rsvpSubmitted", "true");

      document.getElementById("rsvp-form").style.display = "none";

      const success = document.getElementById("success-message");
      success.style.display = "flex";
      const attendance = data.get("attendance");
      if (attendance.includes("На жаль")) {
        success.innerText =
          "Нам дуже шкода, що вас не буде цього дня 🤍 Але дякуємо, що повідомили нас.";
      } else {
        success.innerText =
          "Дякуємо! 🤍 Ми отримали вашу відповідь і будемо дуже раді бачити вас на святі.";
      }
    })
    .catch(() => {
      button.disabled = false;
      button.innerText = "Надіслати";
      alert("Щось пішло не так 😢");
    });
}

document.addEventListener("DOMContentLoaded", initRSVPForm);
