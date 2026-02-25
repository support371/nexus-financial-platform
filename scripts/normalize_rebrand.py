"""
Normalize smart quotes/dashes and rebrand Nexus -> ApexTrust in a single-file HTML demo.

Usage:
  python scripts/normalize_rebrand.py app/index.html
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


SMART_MAP = str.maketrans(
    {
        "\u2018": "'",  # left single quotation mark
        "\u2019": "'",  # right single quotation mark
        "\u201C": '"',  # left double quotation mark
        "\u201D": '"',  # right double quotation mark
        "\u2013": "-",  # en dash
        "\u2014": "-",  # em dash
        "\u2026": "...",  # horizontal ellipsis
    }
)


def normalize(text: str) -> str:
    text = text.translate(SMART_MAP)

    # Fix CSS custom prop usage where en-dash was used inside var(--token)
    text = text.replace("var(-", "var(--")

    # Fix common JS operator typos caused by smart dash substitutions
    text = text.replace("step-;", "step--;")
    text = text.replace("step-", "step--")
    text = text.replace("depPrev(){S.depWiz.step-;", "depPrev(){S.depWiz.step--;")
    text = text.replace("kycPrev(){S.kycWiz.step-;", "kycPrev(){S.kycWiz.step--;")

    # Fix spread operator typos caused by ellipsis
    text = text.replace("[...", "[...")
    text = text.replace(",..:", ",...")

    # Fix accidental curly braces in JSON spread
    text = text.replace("{...", "{...")

    return text


def rebrand(text: str) -> str:
    # Brand name
    text = text.replace("Nexus Financial", "ApexTrust Banking")
    text = text.replace("nexus", "apextrust")  # broad but works for storage keys/strings

    # Demo emails
    text = re.sub(r"admin@nexus\.[a-z]+", "admin@apextrust.demo", text, flags=re.I)
    text = re.sub(r"alice@nexus\.[a-z]+", "alice@apextrust.demo", text, flags=re.I)
    text = re.sub(r"demo@nexus\.[a-z]+", "demo@apextrust.demo", text, flags=re.I)

    # Reference code prefixes
    text = text.replace("genRef('NEX')", "genRef('APT')")
    text = text.replace('genRef("NEX")', 'genRef("APT")')
    text = text.replace("referenceCode=genRef('NEX')", "referenceCode=genRef('APT')")
    text = text.replace("referenceCode:genRef('NEX')", "referenceCode:genRef('APT')")

    # Storage key normalization
    text = re.sub(r"const\s+SK\s*=\s*'[^']+';", "const SK = 'apextrust_banking_v1';", text)

    # Nav logo letter -> AT
    text = text.replace('<div class="nav-logo">N</div>', '<div class="nav-logo">AT</div>')
    text = text.replace('<div class="auth-logo">N</div>', '<div class="auth-logo">AT</div>')

    # BIC for EU demo
    text = text.replace("bic:'NEXSGB2L'", "bic:'APXTGB2L'")

    # Policy copy: fictional entity name
    text = text.replace(
        "Nexus Financial is a fictional entity",
        "ApexTrust Banking is a fictional entity",
    )

    return text


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python scripts/normalize_rebrand.py app/index.html")
        return 2

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"File not found: {path}")
        return 2

    raw = path.read_text(encoding="utf-8")
    out = rebrand(normalize(raw))

    path.write_text(out, encoding="utf-8")
    print(f"[OK] Normalized + rebranded: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
