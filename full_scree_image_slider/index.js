const sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right");
let current = 0;

// Clear all images
const reset = function () {
  sliderImages.forEach((slide) => {
    console.log(slide);

    slide.style.display = "none";
  });
};

// Initialize slider
const startSlide = function () {
  reset();
  sliderImages[0].style.display = "block";
};

// Show previous
const slideLeft = function () {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
};

// Show next
const slideRight = function () {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
};

// Left arrow click
arrowLeft.addEventListener("click", function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();
