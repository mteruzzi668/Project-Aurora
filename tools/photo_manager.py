from pathlib import Path
import json
import subprocess
from PIL import Image, ImageDraw, ImageFont
from exif_reader import get_exif
from formatter import *
from lens_database import get_lens

# ==========================================================
# WATERMARK
# ==========================================================

def add_watermark(img):

    watermark = "© Marco Teruzzi"

    img = img.convert("RGBA")

    layer = Image.new(
        "RGBA",
        img.size,
        (255,255,255,0)
    )

    draw = ImageDraw.Draw(layer)


    # grandezza proporzionale alla foto
    font_size = int(img.size[0] * 0.025)

    try:
        font = ImageFont.truetype(
            "arial.ttf",
            font_size
        )
    except:
        font = ImageFont.load_default()


    bbox = draw.textbbox(
        (0,0),
        watermark,
        font=font
    )

    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]


    margin = int(img.size[0] * 0.03)


    position = (
        img.size[0] - text_width - margin,
        img.size[1] - text_height - margin
    )


    draw.text(
        position,
        watermark,
        font=font,
        fill=(255,255,255,120)
    )


    combined = Image.alpha_composite(
        img,
        layer
    )

    return combined.convert("RGB")

# ==========================================================
# START
# ==========================================================

ROOT = Path(__file__).resolve().parent.parent

PHOTO_DIR = ROOT / "photo"

WEB_PHOTO_DIR = ROOT / "assets" / "photo"

DATABASE_FILE = ROOT / "data" / "database.json"

EXIFTOOL = ROOT / "tools" / "exiftool" / "exiftool.exe"

VALID_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".JPG",
    ".JPEG"
}


def create_title(filename):

    name = filename.stem
    name = name.replace("_private", "")

    name = name.replace("-", " ")

    name = name.replace("_", " ")

    words = []

    for word in name.split():

        words.append(word.capitalize())

    return " ".join(words)


def category_from_path(path):

    parts = path.parts

    category = ""

    subcategory = ""

    if len(parts) >= 1:

        category = parts[0]

    if len(parts) >= 2:

        subcategory = parts[1]

    return category, subcategory

def relative_path(path):

    return path.relative_to(ROOT).as_posix()

def create_web_image(file):

    relative = file.relative_to(PHOTO_DIR)

    output = WEB_PHOTO_DIR / relative

    output.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    img = Image.open(file)

    img.thumbnail(
        (2048, 2048)
    )
    
    img = add_watermark(img)

    img.save(
        output,
        "JPEG",
        quality=85,
        optimize=True
    )

    return output

photos = []

print("\n===================================")
print("   PROJECT AURORA PHOTO MANAGER")
print("===================================\n")

for file in PHOTO_DIR.rglob("*"):

    if not file.is_file():
        continue

    if file.suffix not in VALID_EXTENSIONS:
        continue

    category, subcategory = category_from_path(
        file.relative_to(PHOTO_DIR)
    )
    is_private = "_private" in file.stem.lower()

    exif = get_exif(file)

    web_file = create_web_image(file)

    lens = get_lens(

    format_lens(exif)

    )


    # ----------------------------------------------------------
    # FIX CANON RF 100-500 ON CANON EOS R7
    # ----------------------------------------------------------

    lens_name = lens["name"]

    if (
        format_camera(exif) == "Canon EOS R7"
        and lens_name == "Canon RF 50mm F1.2L USM or other Canon RF Lens"
    ):

        lens_name = "Canon RF 100-500mm F4.5-7.1L IS USM"


    photo = {

        "id": len(photos) + 1,

        "filename": file.name,

        "title": create_title(file),

        "path": relative_path(web_file),

        "original": relative_path(file),

        "extension": file.suffix,

        "category": category,

        "subcategory": subcategory,

        "private": is_private,

        "camera": format_camera(exif),

        "lens": lens_name,

        "lensId": lens["id"],

        "iso": format_iso(exif),

        "focalLength": format_focal(exif),

        "aperture": format_aperture(exif),

        "shutter": format_shutter(exif),

        "date": format_date(exif),

    }

    photos.append(photo)

photos.sort(key=lambda p: p["path"])

for index, photo in enumerate(photos, start=1):

    photo["id"] = index

DATABASE_FILE.parent.mkdir(parents=True, exist_ok=True)

with open(DATABASE_FILE, "w", encoding="utf-8") as f:

    json.dump(
        photos,
        f,
        indent=4,
        ensure_ascii=False
    )

print(f"Photos found : {len(photos)}")

print(f"Database     : {DATABASE_FILE}")

print("\nDone.\n")

input("Press ENTER to close...")