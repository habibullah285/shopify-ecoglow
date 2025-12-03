// Initialize all Swipers
const swiperInstances = {};
document.querySelectorAll(".mySwiper").forEach((el) => {
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

// Tabs
const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    // hide all swipers
    document
      .querySelectorAll(".mySwiper")
      .forEach((s) => s.classList.add("!hidden"));

    // remove active style
    tabs.forEach((b) =>
      b.classList.remove(
        "border-b-2",
        "border-black",
        "font-medium",
        "text-black"
      )
    );
    tabs.forEach((b) => b.classList.add("text-gray-500"));

    // activate clicked tab
    btn.classList.remove("text-gray-500");
    btn.classList.add(
      "text-black",
      "font-medium",
      "border-b-2",
      "border-black"
    );

    // show target swiper
    const swiperEl = document.getElementById(target);
    swiperEl.classList.remove("!hidden");

    // update swiper
    swiperInstances[target].update();
  });
});
