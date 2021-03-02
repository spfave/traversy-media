const sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right");
let current = 0;

// Clear all images
const reset = function () {
  sliderImages.forEach((slide) => {
    slide.style.display = "none";
  });
};

// Clear current image
const resetSlide = function () {
  sliderImages[current].style.display = "none";
};

// Initialize slider
const startSlide = function () {
  reset();
  sliderImages[0].style.display = "block";
};

// Show previous
const slideLeft = function () {
  sliderImages[current].style.display = "none";
  if (current === 0) {
    current = sliderImages.length;
  }
  sliderImages[--current].style.display = "block";
};

// Show next
const slideRight = function () {
  resetSlide();
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  sliderImages[++current].style.display = "block";
};

// Left arrow click
arrowLeft.addEventListener("click", function () {
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
  slideRight();
});

startSlide();
