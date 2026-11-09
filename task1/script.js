// ----- Light / Dark theme toggle -----
const toggleBtn = document.getElementById("themeToggle");
const icon = toggleBtn.querySelector("i");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  icon.className = theme === "light" ? "fa-regular fa-moon" : "fa-regular fa-sun";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = "dark";
try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
setTheme(saved);

toggleBtn.addEventListener("click", function () {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "light" ? "dark" : "light");
});

// ----- Back to top button -----
document.getElementById("toTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----- Highlight active nav link while scrolling -----
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("#home, #about, #skills, #contact");

window.addEventListener("scroll", function () {
  let current = "home";
  sections.forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  links.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});