/*==========================================================
PROJECT AURORA
Gallery.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* Se siamo nella pagina Portfolio */

    if(document.querySelector(".collection-card")){

        initCollections();

    }

    /* Se siamo nella pagina Gallery */

    if(document.getElementById("photoGrid")){

        loadGallery();

    }

});

/*==========================================================
PORTFOLIO
==========================================================*/

function initCollections(){

    const cards=document.querySelectorAll(".collection-card");

    cards.forEach(card=>{

        card.addEventListener("click",(e)=>{

            e.preventDefault();

            const category=getCategory(card);

            window.location.href=
                "gallery.html?category="+category;

        });

    });

}

function getCategory(card){

    if(card.classList.contains("landscape")) return "landscape";

    if(card.classList.contains("wildlife")) return "wildlife";

    if(card.classList.contains("travel")) return "travel";

    if(card.classList.contains("macro")) return "macro";

    if(card.classList.contains("astro")) return "astro";

    return "";

}

/*==========================================================
GALLERY
==========================================================*/

function loadGallery(){

    const params=new URLSearchParams(window.location.search);

    const category=params.get("category");

    const filteredPhotos=photos.filter(photo=>photo.category===category);

    buildHeader(category,filteredPhotos.length);

    buildGallery(filteredPhotos);

}
/*==========================================================
HEADER
==========================================================*/

function buildHeader(category,totalPhotos){

    const info = galleryInfo[category];

    const title = document.getElementById("galleryTitle");

    const description = document.getElementById("galleryDescription");

    const hero = document.querySelector(".galleryHero");

const breadcrumb =
    document.getElementById("breadcrumbCategory");

    if(info){

        title.textContent = info.title;
	breadcrumb.textContent = info.title;

        description.textContent =
            info.description +
            " • " +
            totalPhotos +
            " photograph" +
            (totalPhotos===1 ? "" : "s");

        hero.style.backgroundImage =
            `url("${info.hero}")`;

    }

    else{

        title.textContent = "Gallery";

        description.textContent = "";

    }

}

/*==========================================================
PHOTO GRID
==========================================================*/

function buildGallery(list){

    const grid=document.getElementById("photoGrid");

    grid.innerHTML="";

    if(list.length===0){

        grid.innerHTML=`

            <div class="emptyGallery">

                <h2>No photographs available</h2>

                <p>

                    This collection is still empty.

                </p>

            </div>

        `;

        return;

    }

    list.forEach(photo=>{

        const card=document.createElement("div");

        card.className="photoCard";

        card.innerHTML=`

            <img
                src="${photo.image}"
                alt="${photo.title}"
                loading="lazy">

            <div class="photoOverlay">

                <h3>${photo.title}</h3>

                <span>${photo.location}</span>

            </div>

        `;

        card.addEventListener("click",()=>{

            openLightbox(photo);

        });

        grid.appendChild(card);

    });

}
/*==========================================================
LIGHTBOX
==========================================================*/

let currentGallery = [];

let currentIndex = 0;

function openLightbox(photo){

    currentGallery = photos.filter(p => p.category === photo.category);

    currentIndex = currentGallery.findIndex(p => p.id === photo.id);

    const lightbox = document.getElementById("lightbox");

    lightbox.classList.remove("hidden");

    updateLightbox();

}

function updateLightbox(){

    const photo = currentGallery[currentIndex];

    document.getElementById("lightboxImage").src = photo.image;

    document.getElementById("lightboxImage").alt = photo.title;

    document.getElementById("photoTitle").textContent = photo.title;

    document.getElementById("photoLocation").textContent =
        photo.location +
        " • " +
        photo.camera +
        " • " +
        photo.lens;

}

function nextPhoto(){

    currentIndex++;

    if(currentIndex >= currentGallery.length){

        currentIndex = 0;

    }

    updateLightbox();

}

function previousPhoto(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = currentGallery.length - 1;

    }

    updateLightbox();

}

/*==========================================================
EVENTS
==========================================================*/

const closeButton = document.getElementById("closeLightbox");

if(closeButton){

    closeButton.addEventListener("click", () => {

        document
            .getElementById("lightbox")
            .classList.add("hidden");

    });

}

const nextButton = document.getElementById("nextPhoto");

if(nextButton){

    nextButton.addEventListener("click", nextPhoto);

}

const prevButton = document.getElementById("prevPhoto");

if(prevButton){

    prevButton.addEventListener("click", previousPhoto);

}

document.addEventListener("keydown", e => {

    const lightbox = document.getElementById("lightbox");

    if(!lightbox) return;

    if(lightbox.classList.contains("hidden")) return;

    if(e.key === "Escape"){

        lightbox.classList.add("hidden");

    }

    if(e.key === "ArrowRight"){

        nextPhoto();

    }

    if(e.key === "ArrowLeft"){

        previousPhoto();

    }

});

const lightbox = document.getElementById("lightbox");

if(lightbox){

    lightbox.addEventListener("click", e => {

        if(e.target.id === "lightbox"){

            lightbox.classList.add("hidden");

        }

    });

}