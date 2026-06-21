# Stride Workout

A personal workout guide, tracker, streak dashboard, routine builder, and music companion built with React, Vite, Tailwind CSS, and LocalStorage.

## Features

- Guided morning and evening workouts with timers, rest countdowns, progress bars, sound cues, and vibration support
- LocalStorage persistence for routines, progress, settings, playlists, and completion history
- GitHub-style 30-day habit tracker with green, yellow, and red day states
- Exercise library with add, edit, delete, duplicate, and asset-backed exercise images
- Visual workout builder with autosave, reorder, inline editing, and move-between-routines controls
- Statistics dashboard powered by Recharts
- Floating YouTube music player that stays available while navigating
- PWA manifest and offline caching with a service worker
- GitHub Pages-safe routing via `HashRouter`

## Folder Structure

- `src/components`
- `src/pages`
- `src/hooks`
- `src/utils`
- `src/data`
- `src/assets/icons`
- `public/exercises`
- `public`

## Local Setup

1. Install Node.js 18+ and npm.
2. Run `npm install`.
3. Run `npm run dev`.
4. Build with `npm run build`.

## GitHub Pages Deployment

This repo is configured to deploy with GitHub Actions.

1. Push this project to a GitHub repository.
2. Make sure your default branch is `main`, or update `.github/workflows/deploy.yml`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to `main`.
6. Wait for the **Deploy to GitHub Pages** workflow to finish.
7. Open the published URL from the Pages settings screen.

## Phone Access

- Once deployed, open the GitHub Pages URL on your phone browser.
- You can install it on Android from the browser menu as a PWA.
- Data is stored per device in `localStorage`, so phone and desktop progress do not sync automatically.
- Use the export/import feature to move data between devices.

## Data Notes

- All app data is stored in browser `localStorage` under the key `stride-workout-state`.
- Export/import uses JSON snapshots of the full app state.
- Exercise image assets live in `public/exercises`.

## Default Data

- Morning routine includes warm-up, strength work, finisher, cooldown, and post-workout notes.
- Evening routine includes light cardio plus mobility and stretching.
