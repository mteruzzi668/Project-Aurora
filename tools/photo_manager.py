from pathlib import Path
import json
import subprocess
from exif_reader import get_exif
from formatter import *
from lens_database import get_lens

ROOT = Path(__file__).resolve().parent.parent

PHOTO_DIR = ROOT / "photo"

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

    exif = get_exif(file)

    lens = get_lens(

    format_lens(exif)

    )

    photo = {

        "id": len(photos) + 1,

        "filename": file.name,

        "title": create_title(file),

        "path": relative_path(file),

        "extension": file.suffix,

        "category": category,

        "subcategory": subcategory,

        "camera": format_camera(exif),

        "lens": lens["name"],

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