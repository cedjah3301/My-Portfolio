'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

const contactForm = document.getElementById("contactForm");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");
const contactInputs = contactForm.querySelectorAll(".form-input");
const captchaLabel = document.getElementById("captchaLabel");
const captchaField = document.getElementById("captchaField");
let captchaAnswer = 0;

// Enable submit only when form valid + captcha filled
function checkContactFormValidity() {
  contactSubmitBtn.disabled = captchaField.value.trim() === "";
}

contactInputs.forEach(input => input.addEventListener("input", checkContactFormValidity));
captchaField.addEventListener("input", checkContactFormValidity);

// Generate CAPTCHA
function generateContactCaptcha() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const ops = ["+", "-"];
  const op = ops[Math.floor(Math.random() * ops.length)];

  switch(op) {
    case "+": captchaAnswer = a + b; break;
    case "-": captchaAnswer = a - b; break;
  }

  captchaLabel.innerText = `What is ${a} ${op} ${b}?`;
}

generateContactCaptcha(); // initialize

// Toast function
function showContactToast(message, success = true) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  toast.style.background = success ? "#4ade80" : "#f87171";
  toast.style.color = "#fff";
  toast.style.padding = "14px 20px";
  toast.style.borderRadius = "12px";
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
  toast.style.opacity = 0;
  toast.style.transition = "0.35s ease";
  document.body.appendChild(toast);

  setTimeout(() => toast.style.opacity = 1, 10);
  setTimeout(() => toast.style.opacity = 0, 3000);
  setTimeout(() => toast.remove(), 3500);
}

// Form submission
contactForm.addEventListener("submit", (e) => {
  if (parseInt(captchaField.value) !== captchaAnswer) {
    e.preventDefault();
    showContactToast("CAPTCHA incorrect! Try again.", false);
    generateContactCaptcha();
    captchaField.value = "";
    checkContactFormValidity();
    return;
  }

  // Allow submission to hidden iframe
  showContactToast("Message sent successfully!", true);

  // Reset form after iframe loads
  const iframe = document.querySelector('iframe[name="hidden_iframe"]');
  iframe.onload = () => {
    contactForm.reset();
    generateContactCaptcha();
    checkContactFormValidity();
  };
});
