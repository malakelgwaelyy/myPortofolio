# Malak Elgwaely: portfolio website

A lightweight, dependency-free static site. Open `index.html` in a browser, or host the folder on any static host.

## Files
- `index.html`: all page content and structure
- `style.css`: design system (colours, type, layout, responsive and reduced-motion rules)
- `script.js`: progressive enhancement only (mobile menu, active section, scroll reveal, certificate dialog). The page is fully readable without it.
- `Malak_Elgwaely_CV.pdf`: CV, linked from the hero and the download button
- `assets/screenshots/`: screenshots of this site (used as the portfolio project preview)
- `assets/certificates/`: certificate images (optional, see below)

## Adding certificate images
Place these files in `assets/certificates/` with exactly these names:
- `cyber_cisco.png` (Cisco, Introduction to Cybersecurity)
- `screenshot.png` (ITI, Python Programming Basics)
- `BASEF.png` (BASEF participation)

If a file is missing, the card shows the issuer initials instead, so nothing appears broken.

## Changing content
All text is in `index.html`. Certificate titles and details used in the dialog are in the `certs` object in `script.js`.

## Regenerating screenshots
Screenshots were captured with Playwright and Chromium at 1440 px (desktop) and 390 px at 2x (mobile).
