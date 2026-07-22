# Visybil Media | Website

Now a 5-page static site, no build step. Files that matter:

| File | What it is |
|---|---|
| `index.html` | Home: hero, why-us + what-you-get (merged), contact/Calendly |
| `process.html` | Standalone Process page |
| `work.html` | Standalone Work page, the 8 video tiles |
| `faq.html` | Standalone FAQ page |
| `beyond.html` | "What Else We Do" page (web dev, AI/automation, ops/VA support) |
| `styles.css` | Shared styling for all 5 pages |
| `main.js` | Shared behavior for all 5 pages (mobile menu, reveal animation, etc.) |
| `CNAME` | Set to `visybil.cc` |
| `visybil-logo.svg` / `favicon.svg` | Your logo + browser tab icon |

Target repo: **https://github.com/abdu11ahbukhari/visybil-website**

## 1. Push the site files to the repo

From a folder containing all the files above:

```
git init
git add index.html process.html work.html faq.html beyond.html styles.css main.js CNAME visybil-logo.svg favicon.svg
git commit -m "Add Visybil site"
git branch -M main
git remote add origin https://github.com/abdu11ahbukhari/visybil-website.git
git push -u origin main
```

If you already cloned the repo locally, just copy these files into the repo root, then:
```
git add index.html process.html work.html faq.html beyond.html styles.css main.js CNAME visybil-logo.svg favicon.svg
git commit -m "Update site"
git push
```

## 2. Turn on Pages (only needed once)

1. On the repo: **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. GitHub gives you `https://abdu11ahbukhari.github.io/visybil-website/` within ~1–2 min — useful for checking the site before the domain is live.

## 3. Point visybil.cc at it — via Cloudflare (only needed once)

No code gets uploaded to Cloudflare. Cloudflare here is just DNS — it points the domain at GitHub, and GitHub actually serves the site. The `CNAME` file already in this repo tells GitHub the site should answer to `visybil.cc`.

1. Log into **Cloudflare → your account → visybil.cc → DNS → Records**.
2. Add four **A** records, all with name `@` (root domain), one for each IP:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Add one **CNAME** record: name `www`, target `abdu11ahbukhari.github.io`.
4. For all of these new records, click the orange cloud icon next to each so it turns grey ("DNS only"). Leave them grey for now — a proxied (orange) record can block GitHub from issuing the SSL certificate the first time around.
5. Back on GitHub: repo → **Settings → Pages** → type `visybil.cc` into the custom domain field → **Save**. GitHub will show "DNS check in progress," then "DNS check successful" once Cloudflare's records propagate.
6. Once GitHub shows the domain as verified, check **Enforce HTTPS** in that same Pages settings panel.
7. Optional, after HTTPS is confirmed working: switch those DNS records back to proxied (orange cloud) in Cloudflare — not required, just an option.

## 4. Create the "examples" folder and upload your 8 videos

Same process as before — no drag-and-drop needed:

1. On GitHub, open **github.com/abdu11ahbukhari/visybil-website**.
2. Click **Add file → Create new file**, type `examples/.gitkeep` as the filename, leave content empty, commit. This creates the `examples` folder.
3. Rename your 8 video files to `vis1.mp4`, `vis2.mp4`, ... `vis8.mp4`.
4. Navigate into the `examples` folder → **Add file → Upload files** → click **choose your files** (not drag) → select all 8 → commit.

Terminal alternative:
```
git clone https://github.com/abdu11ahbukhari/visybil-website.git
cd visybil-website
mkdir examples
cp /path/to/your/videos/vis*.mp4 examples/
git add examples
git commit -m "Add example videos"
git push
```

**Watch for file size:** GitHub blocks single files over 100MB on web upload. If clips are large, compress them first, use [Git LFS](https://git-lfs.com), or host them elsewhere (Cloudflare Stream, Bunny.net) and point the `<video>` tags in `work.html` at that URL instead.

`work.html` expects the files at `examples/vis1.mp4` through `examples/vis8.mp4`, served directly from GitHub Pages. **This only works once Pages is turned on (step 2) *and* the videos are pushed (this step)** — until both are true, the tiles look blank, which isn't a code issue.

## 5. Add the 4 background photos (new)

Full Firefly prompt list is below in chat (copy/paste-friendly). Quick version:

| File | Used on | Aspect ratio |
|---|---|---|
| `images/hero-bg.png` | Home hero | 16:9 |
| `images/process-bg.png` | Process page header | 21:9 |
| `images/work-bg.png` | Work page header | 21:9 |
| `images/faq-bg.png` | FAQ page header | 21:9 |

Once generated: create an `images` folder in the repo (same method as `examples` in step 4), upload all 4 files there, commit. Each page already references its exact filename, low-opacity and desaturated via CSS (`mix-blend-mode: screen`) for the double-exposure look — nothing else to change. If a file isn't there yet, the page just quietly shows no photo (no broken-image icon) until you add it.

## Site structure

- **Nav** (pill-style links, same on every page): Why Us → home section, Process/Work/FAQ → their own pages, What Else We Do → `beyond.html` (styled with a dashed border to set it apart from the rest, since it's a secondary/still-growing page), Contact → home section, Book a Call → home contact section. "Content, handled." now also sits in the header next to the logo, matching the footer tagline.
- **Home** (`index.html`): Hero, Why Us (problem + comparison chart + the 4-stat grid, merged into one section), Contact + Calendly.
- **Process** (`process.html`): the filmstrip step-by-step, plus a "Book a Call" CTA at the bottom.
- **Work** (`work.html`): the 8-video grid (4 + "Show More" for the rest), plus a CTA.
- **FAQ** (`faq.html`): the accordion, plus a CTA.
- **What Else We Do** (`beyond.html`): web dev, AI/automation, and ops/VA support, moved off the home page so it can be built out further on its own later.

## What's already live

- **Calendly**: real embed on the home page, `calendly.com/syedazki/30min`, themed to match the site.
- **Work page**: videos autoplay muted, looped, no controls, like a GIF. First 4 show, "Show More Work" reveals the rest.
- **What Else We Do** (`beyond.html`): web dev, AI/automation, and ops/VA support, reachable from its own nav link.
- **FAQ accordion**: plain `<details>/<summary>`, no JS dependency.

## Still placeholders

- The 4 background photos (see step 5).
- Optionally, a 5th background photo for `beyond.html` (`images/beyond-bg.png`), if you want one later, same double-exposure treatment.
- A client testimonial: there isn't a dedicated section for one right now; let me know if you want one added back in once you have a quote to use.

The home page no longer has a separate contact form, just the Calendly booking widget under "Let's Talk."

Copy, phone number, logo, favicon, and the visybil.cc link in the footer are all live across every page.
