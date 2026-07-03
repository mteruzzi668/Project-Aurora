/*==========================================================
PROJECT AURORA
Gallery.js
==========================================================*/

let photos = [];

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

async function loadGallery(){

    console.log("Loading database...");

    const response = await fetch("./data/database.json");

    console.log(response);

    photos = await response.json();

    console.log(photos);

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    const filteredPhotos =
        photos.filter(photo => photo.category === category);

    buildHeader(category, filteredPhotos.length);

    buildGallery(filteredPhotos);

}
/*==========================================================
HEADER
==========================================================*/

function buildHeader(category,totalPhotos){

    const title =
        document.getElementById("galleryTitle");

    const description =
        document.getElementById("galleryDescription");

    const breadcrumb =
        document.getElementById("breadcrumbCategory");


    const name =
        category.charAt(0).toUpperCase()
        +
        category.slice(1);


    title.textContent = name;

    breadcrumb.textContent = name;


    description.textContent =
        totalPhotos +
        " photograph" +
        (totalPhotos===1 ? "" : "s");

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
                src="${photo.path}"
                alt="${photo.title}"
                loading="lazy">

            <div class="photoOverlay">

                <h3>${photo.title}</h3>

                <span>${photo.subcategory}</span>

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

    document.getElementById("lightboxImage").src = photo.path;

    document.getElementById("lightboxImage").alt = photo.title;

    document.getElementById("photoTitle").textContent = photo.title;

   document.getElementById("photoLocation").innerHTML = `

<button id="infoButton" class="info-button">
ⓘ
</button>

<div id="photoInfoPanel" class="info-panel">

<p>
📍 ${photo.location}
</p>

<p>
📷 ${photo.camera}
</p>

<p>
🔍 ${photo.lens}
</p>

<p>
<b>Settings</b><br>
${photo.focalLength}<br>
${photo.aperture}<br>
${photo.shutter}<br>
ISO ${photo.iso}
</p>

<p>
📅 ${photo.date}
</p>

</div>

`;

document
.getElementById("infoButton")
.addEventListener("click",()=>{

document
.getElementById("photoInfoPanel")
.classList.toggle("active");

});

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