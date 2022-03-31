// Service worker registry
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceworker.js")

    .then(function (registering) {
      // Registration was successful
      console.log(
        "Browser: Service Worker registration is successful with the scope",
        registering.scope
      );
    })
    .catch(function (error) {
      // The registration of the service worker failed
      console.log(
        "Browser: Service Worker registration failed with the error",
        error
      );
    });
} else {
  // The registration of the service worker failed
  console.log("Browser: I don't support Service Workers :(");
}

// // Check if browser is opened on MacOS
// if (navigator.platform.match("Mac") !== null) {
//   // Add MAC class to body if true
//   document.body.setAttribute("class", document.body.className + " MAC");
// }

// Init AOS
AOS.init();

// Cursor effect
// Get elements
var cursor = document.querySelector(".cursor");
var a = document.querySelectorAll("a");

// Get mouseposition and set cursor div to said position
document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

// On click, add/remove hover class
document.addEventListener("mousedown", function () {
  cursor.classList.add("click");
});
document.addEventListener("mouseup", function () {
  cursor.classList.remove("click");
});

// On link hover, add/remove hover class
a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hover");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Hide cursor on leaving browser
var cursorDiv = document.querySelector(".cursor-container");
var html = document.querySelector("html");

function showCursor() {
  cursorDiv.classList.add("visible");
}

function hideCursor() {
  cursorDiv.classList.remove("visible");
}

html.onmouseover = showCursor;
html.onmouseleave = hideCursor;

// Magnetic buttons
var magnets = document.querySelectorAll(".magnetic");
var strength = 50;

magnets.forEach((magnet) => {
  magnet.addEventListener("mousemove", moveMagnet);
  magnet.addEventListener("mouseout", function (event) {
    TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut });
  });
});

function moveMagnet(event) {
  var magnetButton = event.currentTarget;
  var bounding = magnetButton.getBoundingClientRect();
  TweenMax.to(magnetButton, 1, {
    x:
      ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
      strength,
    y:
      ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
      strength,
    ease: Power4.easeOut,
  });
}

// Smooth scrolling for safari or other browsers that don't support scroll-behavior:smooth
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function () {
    smoothScroll.scrollTo(this.getAttribute("href"), 1000);
  });
});

// Execute functions on load
document.addEventListener("DOMContentLoaded", function (event) {
  fadeInPage(); // Page transitions
});

// Drag internship sidenav to scroll
// document.addEventListener("DOMContentLoaded", function () {
//   const ele = document.getElementById("sidenav");
//   ele.style.cursor = "grab";

//   let pos = { top: 0, left: 0, x: 0, y: 0 };

//   const mouseDownHandler = function (e) {
//     ele.style.cursor = "grabbing";
//     ele.style.userSelect = "none";

//     pos = {
//       left: ele.scrollLeft,
//       top: ele.scrollTop,
//       // Get the current mouse position
//       x: e.clientX,
//       y: e.clientY,
//     };

//     document.addEventListener("mousemove", mouseMoveHandler);
//     document.addEventListener("mouseup", mouseUpHandler);
//   };

//   const mouseMoveHandler = function (e) {
//     // How far the mouse has been moved
//     const dx = e.clientX - pos.x;
//     const dy = e.clientY - pos.y;

//     // Scroll the element
//     ele.scrollTop = pos.top - dy;
//     ele.scrollLeft = pos.left - dx;
//   };

//   const mouseUpHandler = function () {
//     ele.style.cursor = "grab";
//     ele.style.removeProperty("user-select");

//     document.removeEventListener("mousemove", mouseMoveHandler);
//     document.removeEventListener("mouseup", mouseUpHandler);
//   };

//   // Attach the handler
//   ele.addEventListener("mousedown", mouseDownHandler);
// });

// Internship sidenav current section indicator
const sections = document.querySelectorAll(".internship section");
const navLi = document.querySelectorAll(".side--nav ul li a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    const href = li.getAttribute("href").substring(1);
    if (href === current) {
      li.classList.add("active");
    }
  });
});

// Image lightbox
let SimpleLightbox = window.SimpleLightbox;
// Lightbox settings
SimpleLightbox.defaults = {
  elementClass: "",
  elementLoadingClass: "slbLoading",
  htmlClass: "slbActive",
  closeBtnClass: "",
  nextBtnClass: "",
  prevBtnClass: "",
  loadingTextClass: "",
  closeBtnCaption: "Close",
  nextBtnCaption: "Next",
  prevBtnCaption: "Previous",
  loadingCaption: "Loading...",
  bindToItems: true,
  closeOnOverlayClick: true,
  closeOnEscapeKey: true,
  nextOnImageClick: false,
  showCaptions: false,
  captionAttribute: "title",
  urlAttribute: "href",
  startAt: 0,
  loadingTimeout: 100,
  appendTarget: "body",
  beforeSetContent: null,
  beforeClose: null,
  beforeDestroy: null,
  videoRegex: new RegExp(/youtube.com|vimeo.com/),
};
// Create lightbox
new SimpleLightbox({ elements: ".case-images a" });
