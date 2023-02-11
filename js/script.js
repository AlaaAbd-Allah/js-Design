// Check if There is Local Storage Color Option
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove active Class from all Color list Items
  document.querySelectorAll(".colors li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      // Add active Class
      element.classList.add("active");
    }
  });
}

// Random Background Options
let backgrounOption = true;

// Variable to control the background interval
let backgroundInterval;

// Check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  
  if (backgroundLocalItem === 'true') {
    backgrounOption = true;
  } else {
    backgrounOption = false;
  }

  // Remove active class from all spans
  document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === 'true') {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Click on Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class fa-spin for Rotation on self
  this.classList.toggle("fa-spin");

  // Toggle Class Open on Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Swich Colors
const colorsLi = document.querySelectorAll(".colors li");

// Loop on All List Items
colorsLi.forEach((li) => {
  // Click on Every Item
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);

    // Set Color on Root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // Set Color on Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    // Remove active Class from all children & add to the target
    handleActive(e);
  });
});

// Swich backgrounds
const randomBackgrounds = document.querySelectorAll(".random-background span");

// Loop on All spans
randomBackgrounds.forEach((span) => {
  // Click on Every span
  span.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);

    // Remove active Class from all Spans & add to the target
    handleActive(e);
  
    if (e.target.dataset.background === 'yes') {
      backgrounOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    }
    else {
      backgrounOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing");

// Get Array of Images
let images = ["land1.jpg", "land2.jpg", "land3.jpg", "land4.jpg"];

// Function to randomize images
function randomizeImgs() {
  if (backgrounOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * images.length);

      // Change Background Image URL
      landingPage.style.backgroundImage =
        'url("imgs/' + images[randomNumber] + ' ")';
    }, 10000);
  }
}
randomizeImgs();

/* Another Way to Change the background */
// let index = 0;
// setInterval(() => {
//     if (index < images.length) {
//         landingPage.style.backgroundImage = 'url("imgs/' + images[index] + ' ")';
//         index++;
//     }
// }, 10000)

// Start Skills
// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Select offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window height
  let windowHeight = this.innerHeight;

  // Window scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// End Skills

// Start Gallery
// Create popup with the image
let outGallery = document.querySelectorAll(".gallery img");

outGallery.forEach(img => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = 'popup-overlay';

    // append overlay to the body
    document.body.appendChild(overlay);

    // create the popup
    let popupBox = document.createElement("div");
    popupBox.className = 'popup-box';

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup 
      popupBox.appendChild(imgHeading);
    }

    // create the image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // put image to the popup
    popupBox.appendChild(popupImage);

    // append popup to the body
    document.body.appendChild(popupBox);

    // create the close button
    let closeButton = document.createElement("span");

    // create the close button text
    let closeButtonText = document.createTextNode("X");

    // append text to close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = 'close-button';

    // append close button to the poppup 
    popupBox.appendChild(closeButton);
  });
});

// close the popup
document.addEventListener('click', function (e) {
  if (e.target.className == 'close-button') {
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
})
// End Gallery

// Start nav bullets
// Function to Scroll to someWhere
function scrollToSomeWhere(elements) {
  elements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSomeWhere(allBullets);
const allLinks = document.querySelectorAll(".links a");
scrollToSomeWhere(allLinks);

// End nav bullets

// Function to Handle Active States
function handleActive(event) {
  // Remove active Class from all Spans
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active Class on target
  event.target.classList.add("active");
}

// Start Bullets
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets-option .yes").classList.add("active");

  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach(span => {
  span.addEventListener('click', (e) => { 
    handleActive(e);
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets_option", 'block');

    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets_option", 'none');
    }
  })
})
// End Bullets

// Reset Button
document.querySelector(".reset-options").onclick = function () {

  // localStorage.clear();

  localStorage.removeItem("color-option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On button
  this.classList.toggle("menu-active");

  // Toggle Class "open" on Links
  tLinks.classList.toggle("open");
}

// Click anywhere to close the menu
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {

    // Check if menu is opened
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" on Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation on Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
}