document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".header__search-button");
  const searchModal = document.getElementById("search-modal");

  // Open search modal
  if (searchBtn && searchModal) {
    searchBtn.addEventListener("click", function () {
      searchModal.classList.remove("hidden");
      searchModal.querySelector("input").focus();
    });
  }

  // Close modal
  const closeBtns = searchModal.querySelectorAll("[data-modal-close]");
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      searchModal.classList.add("hidden");
    });
  });

  // Close on clicking outside
  searchModal.addEventListener("click", function (e) {
    if (e.target === searchModal) {
      searchModal.classList.add("hidden");
    }
  });
});

var swiper = new Swiper(".product-thumb-slider", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".product-main-slider", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
