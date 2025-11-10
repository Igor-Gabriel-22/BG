let index = 0;
const banners = document.querySelectorAll(".banners");
const prevBtn = document.querySelector(".banner-btn.prev");
const nextBtn = document.querySelector(".banner-btn.next");

function showBanner() {
  banners.forEach((banner, i) => {
    banner.classList.remove("active");
    if (i === index) {
      banner.classList.add("active");
    }
  });
}

function nextBanner() {
  index = (index + 1) % banners.length;
  showBanner();
}

function prevBanner() {
  index = (index - 1 + banners.length) % banners.length;
  showBanner();
}

nextBtn.addEventListener("click", nextBanner);
prevBtn.addEventListener("click", prevBanner);

showBanner();
