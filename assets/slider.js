// Initialize all Swipers
const swiperInstances = {};
document.querySelectorAll(".site-swiper").forEach((el) => {
  swiperInstances[el.id] = new Swiper(el, {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: el.querySelector(".swiper-button-next"),
      prevEl: el.querySelector(".swiper-button-prev"),
    },
    breakpoints: {
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3.2 },
      1280: { slidesPerView: 4 },
    },
  });
});

// // Tabs

document.querySelectorAll(".collection-tab-slider").forEach((sliderSection) => {
  const tabs = sliderSection.querySelectorAll(".tab-btn");
  const swipers = sliderSection.querySelectorAll(".site-swiper");

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      // Hide all swipers only inside this section
      swipers.forEach((sw) => sw.classList.add("!hidden"));

      // Reset tab styles (only inside this section)
      tabs.forEach((t) => {
        t.classList.remove(
          "border-b-2",
          "border-black",
          "font-medium",
          "text-black"
        );
        t.classList.add("text-gray-500");
      });

      // Activate clicked tab styles
      btn.classList.remove("text-gray-500");
      btn.classList.add(
        "text-black",
        "font-medium",
        "border-b-2",
        "border-black"
      );

      // Show target swiper (inside this slider section only)
      const targetSwiper = sliderSection.querySelector(`#${target}`);
      if (targetSwiper) {
        targetSwiper.classList.remove("!hidden");

        // Update swiper instance safely
        if (window.swiperInstances && swiperInstances[target]) {
          swiperInstances[target].update();
        }
      }
    });
  });
});
