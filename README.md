# JuaMsitu website

Environmental intelligence for healthier forests. Built with React, Vite, React Router, Framer Motion and Lucide icons.

## Run it in VS Code

1. Install [Node.js](https://nodejs.org) (version 18 or newer).
2. Open this folder in VS Code.
3. Open the terminal (View > Terminal) and run:

```bash
npm install
npm run dev
```

4. Open the address it shows (usually http://localhost:5173).

To make a production build: `npm run build` (output goes to `dist/`). Preview it with `npm run preview`.

## Where to change things

Almost everything you will want to edit is in **`src/config/site.js`**:

| What | Setting |
| --- | --- |
| Email, booking link | `site.email`, `site.bookingUrl` |
| M-Pesa till and suggested amounts | `site.mpesa` |
| Waitlist form service | `site.waitlistEndpoint` |
| Social media profiles | `site.socials` (empty links are hidden) |
| Photos and hero video file paths | `images`, `images.heroVideo` |
| Capability status (prototype, in development, planned) | `capabilities` |

Colours and fonts live at the top of `src/styles/global.css`.

## Hero background video

The homepage hero plays a looping video over the forest photo. Until the video files exist, it simply shows the photo, so nothing breaks.

**Where the files go:** `public/videos/`, with exactly these names:

| File | Used for |
| --- | --- |
| `hero-forest-1080.webm` | Desktop (tried first) |
| `hero-forest-1080.mp4` | Desktop fallback (Safari) |
| `hero-forest-720.webm` | Screens under 768px wide |
| `hero-forest-720.mp4` | Small-screen fallback |

**Targets:** 8 to 12 seconds, no audio, under 5 MB per 1080p file (720p files should be much smaller).

**Compressing with ffmpeg** (free, ffmpeg.org). Start from your edited clip, `source.mp4`:

```bash
# 1080p WebM (VP9)
ffmpeg -i source.mp4 -an -vf "scale=-2:1080,fps=24" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 public/videos/hero-forest-1080.webm

# 1080p MP4 (H.264)
ffmpeg -i source.mp4 -an -vf "scale=-2:1080,fps=24" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/hero-forest-1080.mp4

# 720p versions for small screens
ffmpeg -i source.mp4 -an -vf "scale=-2:720,fps=24" -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 public/videos/hero-forest-720.webm
ffmpeg -i source.mp4 -an -vf "scale=-2:720,fps=24" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/hero-forest-720.mp4
```

If a 1080p file comes out over 5 MB, raise the `-crf` number by 2 and try again.

**A seamless loop.** The site already fades the video out to the poster photo in its last 0.7 seconds and back in as it restarts. For the smoothest result, end the clip on (or close to) the aerial canopy shown in the poster photo. To bake a crossfade into the file itself, blend the last second into the first:

```bash
# For a 10-second clip: crossfade its final 1 s into its opening 1 s
ffmpeg -i source.mp4 -filter_complex "[0:v]split[a][b];[a]trim=1:10,setpts=PTS-STARTPTS[main];[b]trim=0:1,setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=1:offset=8[v]" -map "[v]" -an looped.mp4
```

Then compress `looped.mp4` with the commands above.

**Matching the poster.** The poster is the hero photo set in `images.hero` in `src/config/site.js`. If your video ends on a different shot, export a still of its last frame, save it as `public/images/hero-poster.jpg` and point `images.hero.src` to `/images/hero-poster.jpg`.

**Behaviour built in:** reduced-motion users and Save-Data / 2G connections see the photo only; screens under 768px get the 720p files; a pause/play button appears bottom-right once the video plays.

## Connecting the waitlist form

The form validates input but does **not** send anything until you connect a service. Until then it tells visitors their details were not sent and offers a pre-filled email instead.

To connect Formspree (free tier):

1. Create an account at https://formspree.io and make a new form.
2. Copy the endpoint, for example `https://formspree.io/f/abcdwxyz`.
3. Paste it into `waitlistEndpoint` in `src/config/site.js`.

Success is only shown after the service confirms it received the submission.

## Photos

Photos load from Unsplash (free to use under the Unsplash licence):

- Kakamega Forest by Nala Okallo
- Aerial forest canopy by Daniel Gonzalez
- Kimana landscape by Mariola Grobelska

To use your own, put them in `public/images/` and change the `src` values in `site.js` to paths like `/images/my-photo.jpg`. If any image fails to load, a forest-green background appears instead of a broken image.

Logo files in `public/images/`:

- `logo-full.png`: full logo, transparent background
- `logo-mark.png`: emblem only (used in the navigation and footer)
- `coming-soon.jpg`: the Explore page visual

## Before you launch

- Check the capability statuses in `site.js` match what the prototype really does.
- Have the Privacy policy and Terms of use (`src/pages/Legal.jsx`) reviewed, for example against Kenya's Data Protection Act, 2019. They are drafts.
- Add real social media links, or leave them empty to hide them.
- The platform preview on the home page uses illustrative sample data and says so. Keep that label until it shows real data.

## Deploying

- **Vercel:** import the project; `vercel.json` handles page routing.
- **Netlify:** build command `npm run build`, publish directory `dist`; `public/_redirects` handles routing.

## Folder structure

```
public/            static files (logo, favicon, images)
src/
  config/site.js   content and settings
  styles/          global styles and colour tokens
  components/      navigation, footer, dashboard preview, form, shared pieces
  pages/           one file per page, plus pages.css
  App.jsx          routes
  main.jsx         entry point
```
