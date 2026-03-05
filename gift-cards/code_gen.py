#!/usr/bin/env python3
"""
Generate 100 unique gift-card IDs + QR code PNGs that link to:

  https://woodbinelog.org/#/admin/gift-card?id=<ID>

Outputs:
- ./out/qr/<ID>.png        (QR images)
- ./out/gift_cards.csv     (ID + URL + filename)

Install deps:
  pip install qrcode[pil]
"""

from __future__ import annotations

import csv
import secrets
import string
from pathlib import Path

import qrcode


BASE_URL = "https://woodbinelog.org/#/admin/gift-card?id="
COUNT = 100

# Choose an ID alphabet that engraves nicely and avoids lookalikes (0/O, 1/I, etc.)
ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"  # Crockford-ish, no 0/1/O/I
ID_LEN = 8  # 8 chars = 32^8 possibilities (~1.1e12), essentially no collisions


def generate_id(existing: set[str], length: int = ID_LEN) -> str:
    while True:
        # Use cryptographic randomness
        new_id = "".join(secrets.choice(ALPHABET) for _ in range(length))
        if new_id not in existing:
            existing.add(new_id)
            return new_id


def make_qr_png(url: str, out_path: Path) -> None:
    # Higher error correction is nicer for scanning even if the engraving is imperfect
    qr = qrcode.QRCode(
        version=None,  # auto
        error_correction=qrcode.constants.ERROR_CORRECT_Q,  # ~25% recovery
        box_size=12,   # overall pixel size
        border=4,      # quiet zone
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(out_path)


def main() -> None:
    out_dir = Path("out")
    qr_dir = out_dir / "qr"
    qr_dir.mkdir(parents=True, exist_ok=True)

    csv_path = out_dir / "gift_cards.csv"

    seen: set[str] = set()
    rows: list[dict[str, str]] = []

    for _ in range(COUNT):
        gid = generate_id(seen)
        url = f"{BASE_URL}{gid}"
        filename = f"{gid}.png"
        png_path = qr_dir / filename

        make_qr_png(url, png_path)

        rows.append(
            {
                "id": gid,
                "url": url,
                "qr_png": str(png_path.as_posix()),
            }
        )

    # Write mapping file for your records / printing workflow
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "url", "qr_png"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✅ Generated {COUNT} gift card QR codes")
    print(f"QR folder: {qr_dir.resolve()}")
    print(f"CSV map : {csv_path.resolve()}")


if __name__ == "__main__":
    main()
