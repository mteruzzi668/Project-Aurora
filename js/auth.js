/*==========================================
AUTH
==========================================*/
const PRIVATE_PASSWORD = "Aurora";

const ADMIN_PASSWORD = "AuroraAdmin";

const Visibility = {

    PUBLIC: 0,

    PRIVATE: 1,

    ADMIN: 2

};

function getVisibility(){

    return Number(
        sessionStorage.getItem("visibility") ?? 0
    );

}

function isPrivate(){

    return getVisibility() >= Visibility.PRIVATE;

}

function isAdmin(){

    return getVisibility() >= Visibility.ADMIN;

}

function enablePrivate(){

    sessionStorage.setItem(
        "visibility",
        Visibility.PRIVATE
    );

}

function enableAdmin(){

    sessionStorage.setItem(
        "visibility",
        Visibility.ADMIN
    );

}

function logout(){

    sessionStorage.removeItem("visibility");

}

document.addEventListener("DOMContentLoaded",()=>{

    const button =
        document.getElementById("loginButton");

    if(!button) return;

    updateButton();

    button.addEventListener("click",login);

});

/*==========================================================
AUTH INITIALIZATION
==========================================================*/

function login(){

    if(isPrivate()){

        logout();

        location.reload();

        return;

    }

    const password =
        prompt("Password");

    if(password===PRIVATE_PASSWORD){

        enablePrivate();

        location.reload();

        return;

    }

    if(password===ADMIN_PASSWORD){

        enableAdmin();
    
        location.reload();

        return;

    }

    updateButton();

}

/*==========================================================
LOGIN
==========================================================*/

function updateButton(){

    const button =
        document.getElementById("loginButton");

    if(!button) return;

    if(isAdmin()){

        button.textContent="🛠 Admin Mode";

    }

    else if(isPrivate()){

        button.textContent="🔓 Private Mode";

    }

    else{

        button.textContent="🔒 Private Mode";

    }

}