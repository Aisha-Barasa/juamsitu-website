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
| Photos | `images` |
| Capability status (prototype, in development, planned) | `capabilities` |
| Team profiles and partner logos | `team`, `partners` |

Colours and fonts live at the top of `src/styles/global.css`.

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
