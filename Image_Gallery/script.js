



// Select all filter buttons and filterable cards
const filterButtons = document.querySelectorAll(".filter_buttons button");
const filterableCards = document.querySelectorAll(".filterable_cards .card");
const lightbox = document.createElement("div");
const lightboxImg = document.createElement("img");
const closeBtn = document.createElement("span");
const prevBtn = document.createElement("span");
const nextBtn = document.createElement("span");
let currentIndex = 0;

// Setup lightbox
lightbox.classList.add("lightbox");
closeBtn.innerHTML = "&times;";
prevBtn.innerHTML = "&#10094;";
nextBtn.innerHTML = "&#10095;";
lightbox.appendChild(closeBtn);
lightbox.appendChild(prevBtn);
lightbox.appendChild(lightboxImg);
lightbox.appendChild(nextBtn);
document.body.appendChild(lightbox);

// Define the filterCards function
const filterCards = (e) => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach((card) => {
        if (card.dataset.name.toLowerCase() === e.target.dataset.name.toLowerCase() || e.target.dataset.name === "all") {
            card.classList.remove("hide");
        } else {
            card.classList.add("hide");
        }
    });
};

// Add event listener for filtering
filterButtons.forEach((button) => button.addEventListener("click", filterCards));

// Image navigation (lightbox)
const images = document.querySelectorAll(".card img");
const imageArray = Array.from(images);

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
    });
});

const updateImage = (index) => {
    if (index >= 0 && index < imageArray.length) {
        lightboxImg.src = imageArray[index].src;
        currentIndex = index;
    }
};

prevBtn.addEventListener("click", () => updateImage(currentIndex - 1));
nextBtn.addEventListener("click", () => updateImage(currentIndex + 1));
closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));

// Close lightbox when clicking outside image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
});

// Add necessary styles dynamically
const style = document.createElement("style");
style.innerHTML = `
    .lightbox {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0; visibility: hidden;
        transition: opacity 0.3s ease-in-out;
    }
    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    .lightbox img {
        max-width: 80%;
        max-height: 80%;
        border-radius: 10px;
    }
    .lightbox span {
        position: absolute;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        user-select: none;
    }
    .lightbox span:nth-child(1) { top: 20px; right: 30px; font-size: 3rem; }
    .lightbox span:nth-child(2) { left: 30px; }
    .lightbox span:nth-child(4) { right: 30px; }
`;
document.head.appendChild(style);
