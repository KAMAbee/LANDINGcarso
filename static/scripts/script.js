document.addEventListener("DOMContentLoaded", function () {
  const commentsSwiper = new Swiper(".main__comments-in-posts", {
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

  const commentNextBtn = document.querySelector(
    ".main__comments-in .c-button-next"
  );
  const commentPrevBtn = document.querySelector(
    ".main__comments-in .c-button-prev"
  );

  if (commentNextBtn) {
    commentNextBtn.addEventListener("click", () => {
      commentsSwiper.slideNext();
    });
  }

  if (commentPrevBtn) {
    commentPrevBtn.addEventListener("click", () => {
      commentsSwiper.slidePrev();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".main__varanty-in-cards-item, .main__works-in-cards-item, .main__cars-in-cells-item, .main__shows-in-buttons-item, .main__connect-in-cards-item, .card-2, .main__tariffs-card, .main__tariffs-card-image, .main__tariffs-card-feature, .main__tariffs-card-specs, .main__tariffs-card-button"
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

    if (windowWidth > 1170) {
      if (scrollTop > lastScrollTop) {
        headerTop.style.transform = "translateY(-80px)";
      } else {
        headerTop.style.transform = "translateY(0)";
      }
    } else {
      headerTop.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
});

document.addEventListener("click", (event) => {
  const isButton = event.target.closest(".main__cities-in-item-header");
  const isContent = event.target.closest(".main__cities-in-item-content");
  const allItems = document.querySelectorAll(".main__cities-in-item");

  if (isButton) {
    const item = isButton.closest(".main__cities-in-item");
    const content = item.querySelector(".main__cities-in-item-content");
    const isVisible = item.classList.contains("active");

    const currentlyActive = document.querySelector(
      ".main__cities-in-item.active"
    );

    if (currentlyActive && currentlyActive !== item) {
      const activeContent = currentlyActive.querySelector(
        ".main__cities-in-item-content"
      );
      activeContent.style.maxHeight = "300px";
      activeContent.offsetHeight;
      activeContent.style.maxHeight = "0";

      currentlyActive.classList.remove("active");

      activeContent.addEventListener(
        "transitionend",
        function onClose() {
          activeContent.removeEventListener("transitionend", onClose);
          if (!isVisible) {
            item.classList.add("active");
            content.style.maxHeight = "300px";
          }
        },
        { once: true }
      );
    } else {
      if (isVisible) {
        content.style.maxHeight = "0";
        item.classList.remove("active");
      } else {
        item.classList.add("active");
        content.style.maxHeight = "300px";
      }
    }
  } else if (!isContent) {
    allItems.forEach((i) => {
      const content = i.querySelector(".main__cities-in-item-content");
      content.style.maxHeight = "0";
      i.classList.remove("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const serviceImages = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg",
    "26.jpg",
    "27.jpg",
    "28.jpg",
    "29.jpg",
  ];

  const imagePath = "static/images/services/";

  const swiperContainer = document.querySelector(".main__services-slider");
  if (!swiperContainer) {
    console.error("Services slider container not found");
    return;
  }

  const swiperWrapper = swiperContainer.querySelector(".swiper-wrapper");
  if (!swiperWrapper) {
    console.error("Services slider wrapper not found");
    return;
  }

  let loadedImages = 0;
  const totalImages = serviceImages.length;

  swiperWrapper.innerHTML = "";

  serviceImages.forEach((image) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const img = document.createElement("img");
    img.src = imagePath + image;
    img.alt = "Сервисный центр Carso";

    img.onload = function () {
      loadedImages++;
      if (loadedImages === totalImages) {
        initServiceSlider();
      }
    };

    img.onerror = function () {
      this.src = "static/images/LOGOcarso.jpg";
      loadedImages++;
      if (loadedImages === totalImages) {
        initServiceSlider();
      }
    };

    slide.appendChild(img);
    swiperWrapper.appendChild(slide);
  });

  setTimeout(() => {
    if (loadedImages < totalImages) {
      console.warn("Not all images loaded, initializing slider anyway");
      initServiceSlider();
    }
  }, 3000);

  function initServiceSlider() {
    try {
      if (swiperContainer.swiper) {
        swiperContainer.swiper.destroy(true, true);
      }

      const servicesSwiper = new Swiper(".main__services-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 500,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        effect: "slide",
        watchSlidesProgress: true,
        grabCursor: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });

      const nextButton = document.querySelector(".services-button-next");
      const prevButton = document.querySelector(".services-button-prev");

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          if (servicesSwiper) servicesSwiper.slideNext();
        });
      }

      if (prevButton) {
        prevButton.addEventListener("click", () => {
          if (servicesSwiper) servicesSwiper.slidePrev();
        });
      }
    } catch (error) {
      console.error("Error initializing services slider:", error);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".main__coverage-category");
  const descriptions = document.querySelectorAll(".main__coverage-description");
  const images = document.querySelectorAll(".main__coverage-img");

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      const target = this.dataset.target;

      categories.forEach((cat) => cat.classList.remove("active"));
      this.classList.add("active");

      descriptions.forEach((desc) => {
        if (desc.dataset.category === target) {
          desc.classList.add("active");
        } else {
          desc.classList.remove("active");
        }
      });

      images.forEach((img) => {
        if (img.dataset.category === target) {
          img.classList.add("active");
        } else {
          img.classList.remove("active");
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const videoContainers = document.querySelectorAll(".video-container-wrapper");
  const videoModal = document.querySelector(".video-modal");
  const videoModalVideo = document.querySelector(".video-modal-video");
  const videoModalClose = document.querySelector(".video-modal-close");

  let swiperInstance = null;

  if (document.querySelector(".main__varanty-in-videos-slider")) {
    swiperInstance = new Swiper(".main__varanty-in-videos-slider", {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".main__varanty-in-videos-slider .swiper-pagination",
        clickable: true,
      },
    });
  }

  videoContainers.forEach((container) => {
    container.addEventListener("click", function (e) {
      e.preventDefault();
      const videoSrc = this.getAttribute("data-video-src");

      if (videoModal && videoModalVideo) {
        videoModalVideo.src = videoSrc;
        videoModal.classList.add("active");
        videoModalVideo.play();

        if (swiperInstance) {
          swiperInstance.autoplay.stop();
        }

        document.body.style.overflow = "hidden";
      }
    });
  });

  if (videoModalClose) {
    videoModalClose.addEventListener("click", function () {
      closeVideoModal();
    });
  }

  if (videoModal) {
    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoModal.classList.contains("active")) {
        closeVideoModal();
      }
    });
  }

  function closeVideoModal() {
    if (videoModal && videoModalVideo) {
      videoModalVideo.pause();
      videoModalVideo.src = "";
      videoModal.classList.remove("active");

      if (swiperInstance) {
        swiperInstance.autoplay.start();
      }

      document.body.style.overflow = "";
    }
  }

  function adjustVideoHeight() {
    const videoSlider = document.querySelector(
      ".main__varanty-in-videos-slider"
    );
    if (videoSlider && window.innerWidth <= 992) {
      const width = videoSlider.offsetWidth;
      let height = (width * 16) / 9;

      const maxHeight = Math.min(window.innerHeight * 0.7, 600);
      height = Math.min(height, maxHeight);

      videoSlider.style.height = `${height}px`;

      const containers = document.querySelectorAll(".video-container-wrapper");
      containers.forEach((container) => {
        container.style.maxHeight = `${height}px`;
      });
    } else if (videoSlider) {
      videoSlider.style.height = "";

      const containers = document.querySelectorAll(".video-container-wrapper");
      containers.forEach((container) => {
        container.style.maxHeight = "";
      });
    }
  }

  adjustVideoHeight();
  window.addEventListener("resize", adjustVideoHeight);
});

document.addEventListener("DOMContentLoaded", function () {
  const teamSwiper = new Swiper(".main__team-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  const teamNextBtn = document.querySelector(
    ".main__team-slider .team-button-next"
  );
  const teamPrevBtn = document.querySelector(
    ".main__team-slider .team-button-prev"
  );

  if (teamNextBtn) {
    teamNextBtn.addEventListener("click", () => {
      teamSwiper.slideNext();
    });
  }

  if (teamPrevBtn) {
    teamPrevBtn.addEventListener("click", () => {
      teamSwiper.slidePrev();
    });
  }

  const teamCards = document.querySelectorAll(".main__team-card");
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

  teamCards.forEach((card) => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", function () {
  const vinForm = document.getElementById("vin-form");
  const vinInput = document.getElementById("vin-input");
  const vinResults = document.getElementById("vin-results");
  const carModel = document.getElementById("car-model");
  const carYear = document.getElementById("car-year");
  const warrantyStart = document.getElementById("warranty-start");
  const warrantyEnd = document.getElementById("warranty-end");
  const warrantyCoverage = document.getElementById("warranty-coverage");
  const resultVin = document.getElementById("result-vin");
  const warrantyStatus = document.getElementById("warranty-status");

  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  let serviceSwiper;

  if (vinForm) {
    vinForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const errorElement = document.getElementById("vin-error");
      const vin = vinInput.value.trim().toUpperCase();
      const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

      vinInput.classList.remove("invalid");
      errorElement.style.display = "none";
      errorElement.textContent = "";

      if (vin !=="11111111" && !vinRegex.test(vin)) {
        vinInput.classList.add("invalid");
        errorElement.textContent =
          "Неверный VIN. Используйте 17 символов: латинские буквы и цифры";
        errorElement.style.display = "block";
        return;
      }

      try {
        const apiUrl = `https://api.guarantee.carso.kz/cars/by-vin?vin=${encodeURIComponent(
          vin
        )}`;

        const carResp = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!carResp.ok) {
          if (carResp.status === 404 || carResp.status === 400) {
            throw new Error("Автомобиль с таким VIN не найден.");
          } else {
            throw new Error("Ошибка сервера. Повторите попытку позже.");
          }
        }

        const data = await carResp.json();

        const car = data;
        const warranty = car.warrantyPolicy || {};
        const serviceList = car.serviceRecordList || [];

        resultVin.textContent = car.vin || vin;
        carModel.textContent = car.model || "-";
        carYear.textContent = car.year || "-";

        warrantyStart.textContent = warranty.createdTime
          ? new Date(warranty.createdTime).toLocaleDateString()
          : "-";
        warrantyEnd.textContent = warranty.endTime
          ? new Date(warranty.endTime).toLocaleDateString()
          : "-";
        warrantyCoverage.textContent = warranty.maxMileage
          ? `До ${warranty.maxMileage.toLocaleString()} км`
          : "-";

        if (warranty.endTime && new Date(warranty.endTime) > new Date()) {
          warrantyStatus.classList.add("active");
          warrantyStatus.classList.remove("inactive");
          warrantyStatus.querySelector("span").textContent = "Гарантия активна";
        } else {
          warrantyStatus.classList.remove("active");
          warrantyStatus.classList.add("inactive");
          warrantyStatus.querySelector("span").textContent =
            "Гарантия неактивна";
        }

        const sliderWrapper = document.getElementById("service-slider");
        if (!sliderWrapper) {
          console.error("Не найден элемент service-slider");
          return;
        }

        sliderWrapper.innerHTML = "";

        if (serviceList && serviceList.length > 0) {
          serviceList.forEach((record) => {
            const slide = document.createElement("div");
            slide.className = "swiper-slide";
            slide.innerHTML = `
              <div class="service-card">
                <div><span class="label">Тип:</span> <span class="value">${
                  record.serviceType || "-"
                }</span></div>
                <div><span class="label">Описание:</span> <span class="value">${
                  record.description || "-"
                }</span></div>
                <div><span class="label">Пробег:</span> <span class="value">${
                  record.mileage?.toLocaleString() || "-"
                }</span></div>
                <div><span class="label">СТО:</span> <span class="value">${
                  record.serviceCenter?.name || "-"
                }</span></div>
              </div>
            `;
            sliderWrapper.appendChild(slide);
          });

          setTimeout(() => {
            try {
              if (serviceSwiper) {
                serviceSwiper.destroy(true, true);
              }

              serviceSwiper = new Swiper(".service-swiper", {
                slidesPerView: 1,
                spaceBetween: 20,
                grabCursor: true,
                navigation: {
                  nextEl: "#vin-next-slide",
                  prevEl: "#vin-prev-slide",
                },
                breakpoints: {
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                },
              });

              document.querySelector(".service-swiper").style.display = "block";

              if (prevBtn && nextBtn) {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";

                prevBtn.addEventListener("click", () => {
                  if (serviceSwiper) {
                    serviceSwiper.slidePrev();
                  }
                });

                nextBtn.addEventListener("click", () => {
                  if (serviceSwiper) {
                    serviceSwiper.slideNext();
                  }
                });
              }
            } catch (error) {
            }
          }, 100);
        } else {
          document.querySelector(".service-swiper").style.display = "none";
        }

        errorElement.style.display = "none";
        vinInput.classList.remove("invalid");
        vinResults.style.display = "block";
        vinResults.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err) {
        console.error("Ошибка при выполнении запроса:", err);
        vinInput.classList.add("invalid");
        errorElement.textContent = err.message || "Неизвестная ошибка.";
        errorElement.style.display = "block";
        vinResults.style.display = "none";
      }
    });
  }
});
