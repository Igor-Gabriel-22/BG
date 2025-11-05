const aside = document.getElementById("aside");
const menuLateral = document.getElementById("menuLateral");
const main = document.getElementById("main");

menuLateral.addEventListener("click", () => {
  aside.classList.toggle("show");
  main.classList.toggle("show");
  menuLateral.classList.toggle("show");
});