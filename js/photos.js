/*==========================================================
PROJECT AURORA
Photo Database
==========================================================*/
const galleryInfo = {

    landscape:{

        title:"Landscapes",

        description:"Mountains, glaciers, waterfalls and volcanic landscapes.",

        hero:"assets/portfolio/landscape/cover.jpg"

    },

    wildlife:{

        title:"Wildlife",

        description:"Animals photographed in their natural environment.",

        hero:"assets/portfolio/wildlife/cover.jpg"

    },

    travel:{

        title:"Travel",

        description:"Journeys, roads and unforgettable places.",

        hero:"assets/portfolio/travel/cover.jpg"

    },

    macro:{

        title:"Macro",

        description:"Textures and details invisible at first glance.",

        hero:"assets/portfolio/macro/cover.jpg"

    },

    astro:{

        title:"Astrophotography",

        description:"The night sky and the universe above us.",

        hero:"assets/portfolio/astro/cover.jpg"

    }

};

const photos = [

    /* ==========================================
       LANDSCAPES
    ========================================== */

    {

        id:1,

        title:"Kirkjufell",

        location:"Iceland",

        category:"landscape",

        image:"photo/iceland/kirkjufell.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    {

        id:2,

        title:"Skógafoss",

        location:"Iceland",

        category:"landscape",

        image:"photo/iceland/skogafoss.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    {

        id:3,

        title:"Diamond Beach",

        location:"Iceland",

        category:"landscape",

        image:"photo/iceland/diamond-beach.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    /* ==========================================
       WILDLIFE
    ========================================== */

    {

        id:101,

        title:"Atlantic Puffin",

        location:"Iceland",

        category:"wildlife",

        image:"photo/wildlife/puffin.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    {

        id:102,

        title:"Seal",

        location:"Iceland",

        category:"wildlife",

        image:"photo/wildlife/seal.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    {

        id:103,

        title:"Arctic Fox",

        location:"Iceland",

        category:"wildlife",

        image:"photo/wildlife/arctic-fox.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    /* ==========================================
       TRAVEL
    ========================================== */

    {

        id:201,

        title:"Road Trip",

        location:"Iceland",

        category:"travel",

        image:"photo/travel/roadtrip.jpg",

        camera:"Canon EOS R7",

        lens:"Sigma 16-300"

    },

    {

        id:202,

        title:"Camper Life",

        location:"Iceland",

        category:"travel",

        image:"photo/travel/camper.jpg",

        camera:"Canon EOS R7",

        lens:"Sigma 16-300"

    },

    /* ==========================================
       MACRO
    ========================================== */

    {

        id:301,

        title:"Basalt Texture",

        location:"Iceland",

        category:"macro",

        image:"photo/macro/basalt.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    {

        id:302,

        title:"Ice Details",

        location:"Iceland",

        category:"macro",

        image:"photo/macro/ice.jpg",

        camera:"Canon EOS R7",

        lens:"Canon RF 100-500L"

    },

    /* ==========================================
       ASTRO
    ========================================== */

    {

        id:401,

        title:"Milky Way",

        location:"Future",

        category:"astro",

        image:"photo/astro/milky-way.jpg",

        camera:"Canon EOS R7",

        lens:"Future Telescope"

    }

];