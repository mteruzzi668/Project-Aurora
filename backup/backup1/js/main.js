const h=document.getElementById("header");
window.addEventListener("scroll",()=>{h.classList.toggle("scrolled",window.scrollY>40);});