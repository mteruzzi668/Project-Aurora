def format_camera(exif):

    return exif.get("Model", "")


def format_lens(exif):

    return exif.get("LensType") or exif.get("LensModel", "")


def format_iso(exif):

    return exif.get("ISO", "")


def format_aperture(exif):

    value = exif.get("FNumber")

    if value == "":
        return ""

    return f"f/{value}"


def format_shutter(exif):

    value = exif.get("ExposureTime", "")

    if value == "":
        return ""

    return f"{value} s"


def format_focal(exif):

    value = str(exif.get("FocalLength", ""))

    return value.replace(".0 mm", " mm")


def format_date(exif):

    value = exif.get("DateTimeOriginal", "")

    return value.replace(":", "-", 2)