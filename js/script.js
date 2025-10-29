let index = 0;
const banners = document.querySelectorAll(".banners");
const prevBtn = document.querySelector(".banner-btn.prev");
const nextBtn = document.querySelector(".banner-btn.next");

function showBanner(i) {
  banners.forEach((banner, idx) => {
    banner.classList.remove("active");
    if (idx === i) banner.classList.add("active");
  });
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % banners.length;
  showBanner(index);
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + banners.length) % banners.length;
  showBanner(index);
});

showBanner(index);
