#!/usr/bin/env python3
"""Privacy scan for a public repo. Stdlib only. Fails on anything that looks like real data.

Generic checks run everywhere (CI included). Extra project-specific words that must never appear
can be supplied through a PRIVATE file outside the repository, named by the BANNED_TERMS_FILE
environment variable (one regex per line; a "cs:" prefix makes a line case-sensitive).
The word list itself is deliberately not stored in this repository.
"""
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SKIP_DIRS = {".git"}
ALLOWED_LINKEDIN_SLUGS = {"abhishek-singla-pm"}
BANNED_SUFFIXES = {".feature", ".pdf", ".docx", ".xlsx", ".csv", ".env", ".zip", ".bak"}
PATTERNS = [
    ("email address", re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")),
    ("phone number", re.compile(r"(?<![\w.])(?:\+\d{1,3}[\s-]?)?(?:\d[\s-]?){10,12}(?![\w.])")),
    ("Drive/Docs link", re.compile(r"(?:drive|docs)\.google\.com/\S+")),
    ("local path", re.compile(r"[A-Za-z]:\\+(?:Users|Abhishek|BBPS)\\|/(?:home|Users)/[^/\s]+/")),
    ("API key / token", re.compile(r"\b(?:sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16})\b")),
    ("biller-ID shape", re.compile(r"\b[A-Z]{4}\d{5}[A-Z]{3}[A-Z0-9]{2}\b|\b[A-Z]{3}\d{6}[A-Z]{3}\d{2}\b")),
]
LI = re.compile(r"linkedin\.com/in/([A-Za-z0-9_%-]+)")


def load_private_terms():
    f = os.environ.get("BANNED_TERMS_FILE")
    if not f or not Path(f).is_file():
        return []
    terms = []
    for raw in Path(f).read_text(encoding="utf-8").splitlines():
        raw = raw.strip()
        if not raw or raw.startswith("#"):
            continue
        cs = raw.startswith("cs:")
        terms.append(re.compile(raw[3:] if cs else raw, 0 if cs else re.I))
    return terms


PRIVATE_TERMS = load_private_terms()
errors = []


def fail(msg):
    errors.append(msg)
    print(f"::error::{msg}")


for path in ROOT.rglob("*"):
    if not path.is_file() or any(p in SKIP_DIRS for p in path.parts) or path.name == "check_repo.py":
        continue
    rel = path.relative_to(ROOT)
    if path.suffix.lower() in BANNED_SUFFIXES or path.name.startswith(".env"):
        fail(f"{rel}: this file type must not be in a public repo")
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    for i, line in enumerate(text.splitlines(), 1):
        for label, rx in PATTERNS:
            if rx.search(line):
                fail(f"{rel}:{i}: possible {label}")
        for m in LI.finditer(line):
            if m.group(1).lower() not in ALLOWED_LINKEDIN_SLUGS:
                fail(f"{rel}:{i}: LinkedIn slug {m.group(1)!r} is not the allowed one")
        for n, rx in enumerate(PRIVATE_TERMS, 1):
            if rx.search(line):
                fail(f"{rel}:{i}: matches private banned term #{n}")

if errors:
    print(f"\n{len(errors)} problem(s) found")
    sys.exit(1)
print("All checks passed" + ("" if PRIVATE_TERMS else " (generic checks only; no private word list loaded)"))
