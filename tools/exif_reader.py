import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

EXIFTOOL = ROOT / "tools" / "exiftool" / "exiftool.exe"


def get_exif(photo_path):

    result = subprocess.run(

        [
            str(EXIFTOOL),
            "-j",
            str(photo_path)
        ],

        capture_output=True,
        text=True,
        encoding="utf-8"

    )

    data = json.loads(result.stdout)[0]

    return data