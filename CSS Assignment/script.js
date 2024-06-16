// Function to check if an element is in the viewport
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle scroll event
function handleScroll() {
  var elements = document.querySelectorAll(".fade-in");

  elements.forEach(function (element) {
    if (isInViewport(element)) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

// Smooth scrolling function
document.querySelectorAll("[data-scroll]").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("data-scroll"));
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  });
});

// Listen for scroll events
window.addEventListener("scroll", handleScroll);
