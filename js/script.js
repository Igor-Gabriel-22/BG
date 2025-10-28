let index = 0;
const banners = document.querySelectorAll(".banners");

function showBanner() {
  banners.forEach((banner, i) => {
    banner.classList.remove("active");
    if (i === index) {
      banner.classList.add("active");
    }
  });

  index = (index + 1) % banners.length; 
}

showBanner();
setInterval(showBanner, 5000);
