# akm.al

The personal website of Akmal Akhpah, an engineer and entrepreneur from Malaysia. Built for [akm.al](https://akm.al).

It is plain HTML, CSS and JavaScript. There is no framework, no build step and no server, and no third-party scripts, cookies or tracking.

## Run it

Open `index.html` in a browser. Every page and link works straight from the file system.

To preview it the way a host would serve it, point any static web server at this folder.

## What is in here

| Path | What it is |
|---|---|
| `index.html`, `about.html`, `work.html`, `speaking.html`, `now.html`, `contact.html` | The main pages |
| `writing/` | The writing index and the articles |
| `404.html` | The not-found page. Its links start at the site root, so it only works once hosted |
| `assets/site.css` | All the styles. Colours for light and dark mode are at the top |
| `assets/site.js` | The theme switch, search and small animations. Every page still works without it |
| `assets/fonts/` | Geist and Geist Mono, cut down to Latin characters. See `OFL-LICENSE.txt` |
| `assets/img/` | The avatar, the share image, the large photo used only in structured data, and company logos in `logos/` |
| `favicon.svg`, `favicon-48.png`, `apple-touch-icon.png` | Browser and device icons |
| `robots.txt`, `sitemap.xml`, `feed.xml`, `llms.txt`, `llms-full.txt` | Files for search engines, feed readers and AI assistants |
| `wrangler.jsonc` | Cloudflare hosting settings |
| `.assetsignore` | Files Cloudflare must not publish |

## Making changes

Pages are edited by hand. The header, sidebar and footer are repeated in every page, so a change to them needs a find and replace across all the `.html` files.

Keep internal links relative and ending in `.html`, such as `about.html`, or `../about.html` from inside `writing/`. That is what lets the site run from the file system.

When you change any page text, make the same change in `llms-full.txt`, which holds the full text of the site. If a key fact changes, update `llms.txt` and the structured data at the top of each page too.

### Adding an article

1. Copy an existing article in `writing/`. Change its text, title, description, canonical URL and structured data.
2. Add it to `writing/index.html`, and to "Recent writing" in `index.html` if you want it on the home page.
3. Update the Previous and Next links in the articles next to it.
4. Add it to `sitemap.xml`, `feed.xml`, `llms.txt` and `llms-full.txt`.
5. Add a line to `INDEX` in `assets/site.js` so search can find it.

## Content rules

Please keep these when adding or changing content, including metadata.

- **Order of work:** OKR (OKR Institute, FlowyTeam, OpenOKR), then EdTech (Pandai, P&AI, FDE Training), then GovTech (Aidan, BORANG).
- **Title:** "Engineer and entrepreneur". Keep it balanced and not tied to one company. Company roles belong on the Work page.
- **Contact:** no email address or phone number. People reach out through LinkedIn, Instagram or Facebook, as @akmalakhpah.
- **Dates:** no current date anywhere, including "updated" stamps, article dates, "this year" and date fields in metadata. Past milestones are fine.
- **Personal details:** no hobbies or private life.
- **Photo:** a small round avatar only, never a large photo on a page.
- **Voice:** short, plain sentences in British English, with no em dashes. Say "we" for anything a team built, and "I" only for your own part. Name the people you learned from.

## Search and AI engines

All content is in the HTML, so crawlers do not need to run any JavaScript. Each page has a canonical URL, a description, Open Graph tags and JSON-LD structured data that identifies the same person across the site. `robots.txt` allows search engines and AI crawlers, and `llms.txt` gives AI assistants a short summary.

## Hosting

The site is set up for Cloudflare Workers with static assets, with no Worker code. `wrangler.jsonc` serves `about.html` at `/about`, matching the canonical URLs, and uses `404.html` for missing pages. Connect this repository to Workers Builds so that each push to `main` deploys the site.

Cloudflare publishes this whole folder, so anything that should stay private must be listed in `.assetsignore`.

The `plan/` folder holds private working notes. It is ignored by git and listed in `.assetsignore`.
