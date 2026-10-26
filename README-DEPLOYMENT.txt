MakeMyTattoo recovered frontend files

Contents:
- index.html
- app.js, experience.js, model.js, body-map.js, chat-media.js, booking-tools.js, cloud-store.js
- styles.css
- assets/makemytattoo-diagonal-pin-v6.png

The original files are preserved; only the folder layout was organized so index.html's
relative logo path resolves on a static host.

IMPORTANT:
cloud-store.js calls /api/workspace and /api/media. GitHub Pages is static hosting and
does not provide those API endpoints. Cloud sync, remote media uploads/deletes, and any
features relying on those endpoints will not work on GitHub Pages without a compatible
backend or code changes. Test in a private/local copy first. Do not publish credentials
or private user/client data.
