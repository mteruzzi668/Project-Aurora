LENS_DATABASE = {

    "Sigma 16-300mm F3.5-6.7 DC OS | C (025)": {

        "id": "sigma16300",

        "name": "Sigma 16-300mm F3.5-6.7 DC OS | Contemporary"

    },

    "Canon RF100-500mm F4.5-7.1 L IS USM": {

        "id": "rf100500",

        "name": "Canon RF100-500mm F4.5-7.1 L IS USM"

    }

}


def get_lens(lens):

    if lens in LENS_DATABASE:

        return LENS_DATABASE[lens]

    return {

        "id": "",

        "name": lens

    }