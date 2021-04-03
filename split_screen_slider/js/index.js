document.addEventListener("DOMContentLoaded", () => {
  // DOM SELECTORS
  const wrapper = document.querySelector("#wrapper");
  let topLayer = wrapper.querySelector(".top");
  const handle = wrapper.querySelector(".handle");

  // VARAIBLES
  let skew = 0;
  let delta = 0;

  if (wrapper.className.indexOf("skewed") !== -1) {
    skew = 1000;
  }

  wrapper.addEventListener("mousemove", (event) => {
    delta = (event.clientX - window.innerWidth / 2) * 0.5;
    handle.style.left = event.clientX + delta + "px";

    topLayer.style.width = event.clientX + skew + delta + "px";
  });
});
