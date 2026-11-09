const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

const fields = {
  name: {
    input: document.getElementById("name"),
    error: document.getElementById("nameError"),
    check: (v) => {
      if (v === "") return "Please enter your name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      return "";
    }
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("emailError"),
    check: (v) => {
      if (v === "") return "Please enter your email.";
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(v)) return "Please enter a valid email address.";
      return "";
    }
  },
  message: {
    input: document.getElementById("message"),
    error: document.getElementById("messageError"),
    check: (v) => {
      if (v === "") return "Please write a message.";
      if (v.length < 10) return "Message must be at least 10 characters.";
      return "";
    }
  }
};

// Check one field and show/hide its error
function validateField(key) {
  const f = fields[key];
  const msg = f.check(f.input.value.trim());
  const wrapper = f.input.parentElement;

  f.error.textContent = msg;
  wrapper.classList.toggle("invalid", msg !== "");
  wrapper.classList.toggle("valid", msg === "");

  return msg === "";
}

// Live feedback while typing (only after the user has typed something)
Object.keys(fields).forEach((key) => {
  fields[key].input.addEventListener("input", () => {
    successMsg.classList.remove("show");
    validateField(key);
  });
});

// On submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let allValid = true;
  Object.keys(fields).forEach((key) => {
    if (!validateField(key)) allValid = false;
  });

  if (allValid) {
    const name = fields.name.input.value.trim();
    successMsg.textContent = "✅ Thank you, " + name + "! Your message has been sent successfully.";
    successMsg.classList.add("show");

    form.reset();
    Object.keys(fields).forEach((key) => {
      fields[key].input.parentElement.classList.remove("valid", "invalid");
      fields[key].error.textContent = "";
    });
  } else {
    successMsg.classList.remove("show");
  }
});