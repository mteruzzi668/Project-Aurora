/*==========================================
AUTH
==========================================*/

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