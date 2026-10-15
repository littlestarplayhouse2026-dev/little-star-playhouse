const toggle = document.getElementById("languageToggle");
let language = "en";
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-en][data-ne]").forEach((el) => {
    el.textContent = el.dataset[next];
  });
  toggle.textContent = next === "en" ? "नेपाली" : "English";
}
toggle.addEventListener("click", () => setLanguage(language === "en" ? "ne" : "en"));
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => {
  document.getElementById("nav").classList.remove("open");
}));
document.getElementById("year").textContent = new Date().getFullYear();