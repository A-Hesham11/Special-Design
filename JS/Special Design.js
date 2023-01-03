// Check If There's Local Storage  Color Option
let mainColor = localStorage.getItem("color_option")

if (mainColor !== null) {

    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));

    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        if (element.dataset.color === mainColor) {

            element.classList.add("active");

        };

    });

};

// Select Setting Page Element
let settingBox = document.querySelector(".settings-box");
let icon = document.querySelector(".settings-box .fa-gear");

icon.onclick = function() {
    
    // Toggle Class Fa-Spin For Rotation On Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    settingBox.classList.toggle("open");

};

// Check If There's Local Storage  Random Background Items
let backgroundLacalItems = localStorage.getItem("background_option");

// Random Background Option
let backgroundOption = true;
        
// Varaible To Control The Background Interval
let backgroundInterval ;

if (backgroundLacalItems !== null) {

    if (backgroundLacalItems === 'true') {

        backgroundOption = true;

    } else {

        backgroundOption = false;

    };

    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLacalItems === 'true') {

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {

        document.querySelector(".random-backgrounds .no").classList.add("active");

    };

};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e)

    });

    // Switch Random Background
    let randomBackground = document.querySelectorAll(".random-backgrounds span");

    randomBackground.forEach(span => {

        span.addEventListener("click", (e) => {

            handleActive(e);

            if (e.target.dataset.background === "yes") {

                backgroundOption = true;

                randomizeImgs();

                localStorage.setItem("background_option", true);

            } else {

                backgroundOption = false;

                clearInterval(backgroundInterval);

                localStorage.setItem("background_option", false);

            };
    
            });

        });

    });

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function Randomize Option
function randomizeImgs() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
        
            // Change Background Image Url
            landingPage.style.backgroundImage = 'url("Imgs/' + imgArray[randomNumber] + '")';
        
        }, 2000);

    };

};
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");
let allSkills = document.querySelectorAll(".skills-box .skill-progress span");

window.onscroll = function() {

    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsoffsetheight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsoffsetheight - windowHeight)) {

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });

    } else if (windowScrollTop + 550 < (skillsOffsetTop + skillsoffsetheight - windowHeight)) {

        allSkills.forEach(skill => {

            skill.style.width = 0;

        });
    }
};

// Create Popup With the Image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // create Overlay Element
        let overlay = document.createElement("div");
        
        overlay.className = "popup-overlay";
        
        document.body.appendChild(overlay);

        // Create The Popup
        let popupBox = document.createElement("div");

        popupBox.className = "popup-box";

        if (img.alt !== null) {

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);

        };

        // Create The Image In The Popup
        let popupImage = document.createElement("img");

        // Set Image Sourse
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Append The Popup Box To Body
        document.body.appendChild(popupBox);

        // create The Close Span
        let closeButton = document.createElement("span");

        closeButton.className = "close-button";

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        closeButtonText.className = "button-text";

        closeButton.appendChild(closeButtonText);

        popupBox.appendChild(closeButton);

        overlay.addEventListener("click", (e) => {

            document.querySelector(".popup-box").remove();
            
            document.querySelector(".popup-overlay").remove();

        });
    });
});

// Close Popup
document.addEventListener("click", function(e) {

    if (e.target.className == "close-button") {

        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();

    };
});

// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
let allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {

    elements.forEach(element => {

        element.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: "smooth"

            });
        });
    });
};
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// Handle Active State
function handleActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });
    
    ev.target.classList.add("active");

};

// Testing Option
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets_option");

if (bulletsLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletsLocalItem === "block") {

        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (span.dataset.display === "show") {

            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets_option", "block");

        } else {

            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets_option", "none");

        };

    });
});

// Reset Button
document.querySelector(".reset-option").onclick = function() {

    // localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");

    window.location.reload()

};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");

let links = document.querySelector(".links-container .links");

toggleBtn.onclick = function(e) {

    // Stop Propagation
    e.stopPropagation()
    
    this.classList.toggle("menu-active");

    links.classList.toggle("open");

};

// Stop Propagation On links
links.onclick = function(e) {

    e.stopPropagation()

};

// Click Anywhere Out Side Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== links) {

        links.classList.remove("open");
        
        toggleBtn.classList.remove("menu-active");

    };

});






