const h=document.getElementById("header");
window.addEventListener("scroll",()=>{h.classList.toggle("scrolled",window.scrollY>40);});
const menuButton =document.getElementById("menuButton");const nav =document.querySelector("nav");if(menuButton){menuButton.addEventListener("click",()=>{nav.classList.toggle("open");});}