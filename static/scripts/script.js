document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 100,
    loop: true,
    navigation: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1000: { slidesPerView: 2 },
    },
  });

  // Подключаем свои кнопки вручную
  document.querySelector(".c-button-next").addEventListener("click", () => {
    document.querySelector(".swiper").swiper.slideNext();
  });

  document.querySelector(".c-button-prev").addEventListener("click", () => {
    document.querySelector(".swiper").swiper.slidePrev();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".main__varanty-in-cards-item, .main__cars-in-cells-item, .main__works-in-cards-item, .main__shows-in-buttons-item, .main__connect-in-cards-item, .card-2, .main__tariffs-in-cards-item-img, .main__tariffs-in-cards-item-img2"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 200);
        }
      });
    },
    { threshold: 0.05 }
  );

  elements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const headerTop = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
    let windowWidth = window.innerWidth;

    if (windowWidth > 1170) { // Добавляем условие
      if (scrollTop > lastScrollTop) {
        headerTop.style.transform = "translateY(-80px)";
      } else {
        headerTop.style.transform = "translateY(0)";
      }
    } else {
      headerTop.style.transform = "translateY(0)"; // Фиксируем header при маленьких экранах
    }

    lastScrollTop = scrollTop;
  });
});


document.addEventListener("click", (event) => {
  const isButton = event.target.classList.contains("main__cities-in-item-header");
  const isContent = event.target.closest(".main__cities-in-item-content");
  const allItems = document.querySelectorAll(".main__cities-in-item");
  
  if (isButton) {
      const item = event.target.parentElement;
      const content = event.target.nextElementSibling;
      const isVisible = item.classList.contains("active");
      
      allItems.forEach(i => i.classList.remove("active"));
      
      if (!isVisible) {
          item.classList.add("active");
      }
  } else if (!isContent) {
      allItems.forEach(i => i.classList.remove("active"));
  }
});

