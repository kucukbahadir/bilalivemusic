# Bilalive Music

**One Voice. One Guitar. One Unforgettable Experience.**

Premium live music across Europe. A voice from Turkey — weddings, corporate events, fairs, festivals and private celebrations. A WeIntensify B.V. brand.

## Stack
Static multi-page site (zero build): HTML + CSS + vanilla JS.
- `assets/css/style.css` — design system (navy/coral/gold, Manrope/Inter/Instrument Serif)
- `assets/js/i18n.js` — TR default + browser-language auto EN/DE/NL/FR, manual switcher
- `assets/js/app.js` — cookie consent (GDPR opt-in, GA gated), Web3Forms forms, package filter, click-to-load YouTube (nocookie), newsletter

## Pages
`index` (landing: hero, videos, packages w/ filters, services, testimonials, booking) · `about` · `contact` · `privacy` · `cookies` · `terms` (TR/EN)

## Config (before go-live)
In each page's `BLM_CONFIG`: set `web3formsKey` (free key from web3forms.com for info@bilalivemusic.com) and optionally `gaId`. Replace WhatsApp placeholder `31000000000`.

## Workflow
Features on `develop` → release by merging to `main`. Hostinger deploys `main` to `public_html` (enable auto-deploy webhook in hPanel for push-to-deploy).
