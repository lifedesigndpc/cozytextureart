# Cozy Texture Art — site + design system

Single-page portfolio for **Cozy Texture Art**, built from the "Ira Mehra Texture Studio" reference design (design system v1.0, October 2026). Follow the design system below for every change. If something isn't covered, choose the quieter option and let the artwork lead.

## Project

- `index.html` — the whole site and its one page template. React 18.3.1 (no build step) + `htm` from jsdelivr for markup. All asset paths are absolute (`/fonts`, `/vendor`, `/data`, `/images`) because pages live at nested URLs.
- `data/artworks.js` — **the catalogue**: `ARTWORKS`, `ART_ROOMS`, `TAGS`, `FAMILIES`, `SUITS`, plus a commented TEMPLATE entry. Adding a piece never touches `index.html`.
- `images/art/<slug>/` — `front.webp` (1600px), `front-sm.webp` (720px, grids/hero/thumbs), `room.webp` (1600px).
- `tools/add_art.py <slug> <front> <room>` — resizes and strips EXIF into `images/art/<slug>/`, prints the `images` block and a suggested palette. Needs Pillow; run with plain `python3` (not `-I`, which hides the user site-packages Pillow lives in). HEIC goes through `sips` first.
- `tools/dev_server.py [port] [dir]` — local server with the same fallback as Vercel (unknown paths → `index.html`).
- `vercel.json` — hosting is Vercel; rewrites `/art/:slug`, `/collection`, `/collection/:room`, `/about` to `index.html`.
- `vendor/`, `fonts/` — React 18.3.1; Instrument Serif + Jost woff2.
- Inline style strings are parsed into React style objects by `hx`/`parseStyle`, so markup stays close to HTML. Hover states use the `.hov-*` / `.lift` classes in `<style>` (inline styles can't do `:hover`).
- Mobile layout is chosen in JS (`m = vw < 720`), not media queries.
- Remote: `github.com/lifedesigndpc/cozytextureart`, branch `main`.
- Preview: the Desktop is iCloud-synced and the preview server can't read it. Copy the folder to the session scratchpad (`site/`) and serve it with `tools/dev_server.py` from there (the `cozy-texture-art` entry in `~/Desktop/.claude/launch.json`). Re-copy after every edit. Test fixtures go in the scratchpad copy only, never in the repo.

### URLs
| Path | Screen |
|---|---|
| `/` | Home |
| `/collection` (`?tag=<tag>`, `?q=`) | Filters + art rooms row; with a filter, the exhibit of matching pieces |
| `/collection/<room-slug>` | Exhibit of one art room |
| `/art/<slug>` | Piece page (the template) |
| `/about` | About + creator note |
| anything else | "This wall is empty." not-found screen |

Links are real `<a href>` (shareable, open in new tab) routed in-page by `link()`; the title updates per piece/room.

### Catalogue model
- **Piece** fields (see TEMPLATE in `data/artworks.js`): `slug`, `title`, `year`, `concept` (2–3 lines: what it is, how it was made), `holds` (one brief note on what it represents → "What it holds"), `size` (`{w,h}` cm or `{d}`), optional `depth`/`relief`, `medium`, `shape`, `family`, `palette`, `tags`, `suits`, `status`, `featured`, `images`.
- **Tags** describe what a piece is (subject, colour story, mood). Every tag must exist in `TAGS`. Add new tags there when a piece needs one.
- **Art rooms are tag collections**: a piece appears in every room sharing at least one tag, so one piece can hang in several rooms. Rooms with no pieces are hidden.
- **No prices** anywhere (decision 2026-10-18). Enquiry is the only path; sold pieces switch the CTA to a commission.
- **Placeholders removed**: no procedural artworks in the catalogue. Procedural SVG (`DECOR`, `artSvg`) survives only as illustration: the texture-vs-print slider, the four process steps, and the home hero until there are ≥3 real pieces.
- **Piece page views** are photo-based: Front, In a room, Close-up (the front photo at 2.6× following the pointer). Photos can't be relit, so raking light, 3D turn and studio film from the reference are not used.
- Front photos are assumed tightly cropped to the canvas edge (shape mask + light-driven shadow). Set `images.front.tight: false` if a photo includes wall/background.

### Adding an art room (workflow with the user)
The user sends one art room at a time, two images per piece: **front** and **in a room**. For each piece:
1. Read the size from the images (W × H cm, or diameter). Don't guess a size that isn't shown; ask.
2. Name it per §10 (2–3 words; place, time or feeling + material/colour; "No." for series). Check the name isn't already used.
3. Write `concept` (2–3 lines, materials and making, honest) and `holds` (one sentence on what it represents), in the §8 voice.
4. Pick `shape`, `family`, 3–4 `palette` pigments (use the tool's hex suggestions, name each with one lower-case food/earth/flower word), `tags` from `TAGS` (add new ones if needed), `suits`.
5. Slug = title in lower-case kebab case. Run `tools/add_art.py`, fill the TEMPLATE, append to `ARTWORKS`.
6. Make sure the room the user named exists in `ART_ROOMS` with tags that pull these pieces in.
7. Preview the piece pages, the room and the home page; then commit and push.

### Cozy Texture Art adaptations (deliberate differences from the reference)

- **Brand:** wordmark is *Cozy* (italic serif) + TEXTURE ART (caps label). Credit line: "Cozy Texture Art, 2026 · {size}". Never "Ira Mehra".
- **Hero label:** "Texture art for everyday living", larger than a normal label (clamp(15px,1.4vw,19px), 14px on mobile).
- **No invented biography.** The reference's personal facts (architect, Bengaluru, Mysuru, named places and relatives) were removed. Don't add personal facts about the creator unless the user gives them.
- **Creator note** replaces the "studio visits by appointment" block: a mother and designer, exploring her creative side.
- **Socials:** Instagram and email only. No Pinterest, no YouTube. Both links are still `#` placeholders.
- **Footer:** "Hand-built, layer by layer · © year", with no city.
- **Portraits** are still striped placeholders. Prices are hidden site-wide (the §10 price format is unused).
- **Voice:** the reference writes in the artist's first person. The site currently uses a warm brand/third-person voice because the creator's own words aren't known yet. Switch to first person once the creator's details are confirmed.

---

## Design system

### 1. Principles
- **The surface is the hero.** Every layout exists to show relief: peaks, ridges and knife marks. Show the texture before any text about it.
- **Pastel, never primary.** Colour lives in the art: soft and mixed with white. The UI stays paper and ink.
- **A quiet frame.** Generous space, thin rules, centred captions, like a gallery wall. No badges, banners or sale language.
- **The artist speaks.** Copy is warm, specific and honest about materials. A shop never talks; the studio does.

### 2. Colour

**Studio neutrals (UI)**

| Token | Hex | Use |
|---|---|---|
| paper | #F7F4EF | Page background everywhere |
| paper-deep | #F0EBE3 | Alternate sections, enquiry, artist blocks |
| chip | #FDFBF8 | Rare raised surfaces on paper |
| parchment | #E9E1D5 | Active chip fill |
| ink | #2B2622 | Headlines, body, buttons, rules |
| ink-soft | #4A433C | Long-form body |
| muted | #5A5149 | Secondary copy, captions |
| hint | #7A7067 | Labels, metadata, prices |
| rose-ink | #8E5A55 | Links and small actions only (the only accent) |
| line | rgba(43,38,34,.12) solid · rgba(43,38,34,.35) dotted | Rules and dividers |

**Pigment palette** (only inside artworks, room covers, wall tints and swatches)
- **Florals (The Bloom Room):** peach #F5D6C6 · rose #E6B8BF · blush #EFC6C6 · apricot #F2CDB0
- **Earthy tones (The Clay Room):** oat #EDE3D2 · sand #E8DCCB · clay #E4C7B1 · terracotta #DDB29A · taupe #D7CBBB
- **Signature pop (Signature Pop Colours):** bubblegum #F4B9CF · aqua #AFE1DB · lemon #F5E69B · coral #F5B8A6 · lilac #C8BEDF
- **Nature (The Grove):** mint #CFE6DA · sage #C9D8C1 · pistachio #D9E4BF · butter #F3E3B0 · powder #C6D8E8 · mist #DDE7EC
- **Grounds:** cream #F6EFE3 · lavender #D8CDE9

**Rules**
- Pigments sit at ~85–92% lightness with low chroma. If it would suit a road sign, it's too strong.
- Never: primary red/blue, neon, pure #000, pure #FFF backgrounds, metallic gold, gradients across the UI. The only gradient allowed is a paper fade under text on imagery.
- Never use pigments for UI text or buttons. Text on pigment is ink only, 11px or larger.
- Text contrast ≥ 4.5:1 on paper.

### 3. Typography
- **Instrument Serif**, regular only: display, titles, artwork names, quotes, italic metadata. Italic is for the emotional word, never whole paragraphs.
- **Jost** 300/400/500: body, labels, buttons, nav. Labels are always UPPERCASE with wide tracking.
- **System mono** (ui-monospace, Menlo): only for hex codes, measurements, timecodes and placeholder notes.
- No third typeface.

| Role | Spec |
|---|---|
| Display | Instrument Serif, clamp(56px, 8vw, 128px), lh .9, tracking -.01em |
| H2 | Instrument Serif, clamp(40px, 5vw, 72px), lh 1 |
| Title | Instrument Serif, clamp(40px, 4.6vw, 68px), lh 1–1.05 |
| Quote / note | Instrument Serif, 24px, lh 1.3 |
| Meta italic | Instrument Serif italic, 18–20px, muted |
| Body | Jost 400, 15–17px, lh 1.65–1.75, ink-soft/muted |
| Label | Jost 400, 10–13px, uppercase, tracking .28–.42em |
| Button | Jost 400, 12px, uppercase, tracking .32em |
| Mono | 10–11px, muted |

### 4. Segments & components
- **Section header:** a 1.5px ink top rule as wide as the label, 12px padding, then an 11px caps label at .42em tracking. Opens every section. Centred on landing pages, left-aligned in detail views.
- **Headline pattern:** a plain statement, then an italic payoff. Two short sentences at most, no exclamation marks. Example: "A print is flat. *This is sculpted.*"
- **Caption stack** (centred under every artwork):
  1. TITLE (13px caps, .28em)
  2. *size or credit* (italic serif, 18px)
  3. price (12px, .2em, hint)
  4. Optional: a 2–3 line note in Jost 14px
- **Actions:**
  - Text link: caps, .36em, 1px underline with 6px offset, ends in →. For navigation.
  - Primary: square ink-filled button, paper text, 18–20px padding. One per screen.
  - Secondary: square 1px ink outline. No rounded rectangles.
- **Chips:** pills (999px radius), only for filters and choices. Inactive: 1px border at 25% ink. Active: parchment fill with an ink border.
- **Circles:** the only round UI shape. Arrow buttons are 48/56px with a 1px ink border. Count badges are 58px.
- **Specs list:** dotted dividers. Label in hint caps on the left, value on the right.
- **Inputs:** a single 1px ink underline, no box. Label in hint caps above, 17px value.
- **Label on imagery:** a paper chip at 86–92% opacity, top-left or bottom-left. Never centred over art (full-bleed hero C is the only exception).
- **Image placeholder:** diagonal parchment stripes (#E6DED2/#EDE6DC, 10px) with a lower-case mono note, e.g. "portrait · at the studio table".

**Page segments, in order**
- **Nav:** sticky, paper at 86% with blur. Italic serif wordmark left, caps links right.
- **Hero:** one idea, "Art you can feel." Three approved forms — A: five pieces scattered with parallax (current); B: one large piece with prev/next; C: full-bleed surface detail with a huge centred serif headline. Never a banner carousel.
- **Texture vs print:** a drag slider comparing a flat print with the textured piece, then three short columns.
- **Featured row:** four works in one row, bottoms aligned, each with a caption stack.
- **Art rooms:** a horizontal row of room covers. Selecting a room opens the Exhibit. Never a product grid.
- **Exhibit:** one work at a time, centred, arrows either side, colour-dot navigation. Shows a 2–3 line note, specs and price.
- **Piece page:** left, the viewer (5 views + 3D turn + studio film); right, title, price, specs, "What it holds", swatches and actions.
- **Enquire:** a paper-deep band. A personal promise on the left, the underline form on the right. On send, a thank-you in the studio's voice replaces the form.
- **About:** intro, portrait, four process steps (Prime, Build, Sculpt, Paint & seal), creator note and socials.
- **Footer:** wordmark, socials in caps, credit line with © year.

### 5. Presenting the artwork
- **Canvas shapes:** Portrait 4:5, radius 2px · Square 1:1, radius 2px · Round: circle · Arch 20:27 with a half-round top (`50% 50% 2px 2px / 37% 37% 2px 2px`) · Landscape 4:3, radius 2px.
- **Hang it, don't box it:** works sit straight on paper with a soft warm shadow falling away from the light. No frames, borders or mats. Shadow: `0 1px 2px rgba(60,40,20,.12), {dx}px {dy}px 36px -10px rgba(70,48,28,.32)`. Hover shadow: `0 24px 40px -24px rgba(70,50,30,.4)`.
- **Five views per piece, always:** Front, Raking light, Close-up, In a room, Side angle. Plus a 3D turn (drag) and a studio film.
- **Keep shadows soft:** relief should read as soft texture, not grime. If a pastel turns grey, raise the light and lower the relief.
  - Default: light elevation 38–40°, relief 3–4.5
  - Raking (detail views only): elevation 12–20°, relief ≤ 5
  - Never: elevation < 25° with relief > 6

### 6. Layout & spacing
- **Spacing scale:** 4 / 8 / 12 / 16 / 22 / 28 / 40 / 64 / 96 px.
- **Gutters:** clamp(20px, 4vw, 56px) (the site uses 16px minimum so phones get a 16px gutter).
- **Section rhythm:** 90–120px vertical padding. Alternate paper and paper-deep; never two deep sections in a row.
- **Widths:** reading text ≤ 560px; comparisons and rows ≤ 1080–1320px; heroes and covers may go full-bleed.
- **Alignment:** gallery moments (featured, exhibit, captions) centred; reading text and forms left-aligned.
- **Grids:** auto-fit minmax(220–340px, 1fr), wrapping freely. Bottom-align artworks of different shapes.
- **Density:** one idea per section. Remove an element rather than shrink it.

### 7. Motion & interaction
- **Raking light:** on landing heroes the light follows the cursor, eased at 0.12 per frame; after 2.5s idle it drifts in a slow circle; it can be switched off (the site also disables it under `prefers-reduced-motion`).
- **Parallax:** artworks drift up to 28px against the cursor, deeper pieces move more. Never on text.
- **Hover:** cards lift 6px with a longer shadow (0.3s ease). Links go from ink to rose-ink.
- **Transitions:** fades and slides only, 0.3–0.6s. No bounces, spins or UI zooms.
- **3D & film:** 3D is drag-to-turn, no autoplay. Films are muted and loop, with visible play/pause.
- **Paper grain:** optional fixed noise overlay at ~32% opacity, multiply blend.

### 8. Voice & tone
Write the way the artist would talk to a friend in the studio: warm, specific about materials, never salesy.

| Where | Do | Don't |
|---|---|---|
| Artwork note | "Six petals, each pressed with the flat of the knife so each one stands at its own height." | "Stunning floral wall art that elevates any space!" |
| CTA | "Enquire about this piece" | "Buy now · Limited stock!" |
| Empty state | "Nothing matches yet. Try a softer search, or write in about a commission." | "0 results found." |
| Confirmation | "Your note is in. A reply will reach you within a day." | "Form submitted successfully." |

### 9. Terminology

| Say | Not | Meaning |
|---|---|---|
| Piece / work | Product, item | A single original artwork |
| Art room | Category, collection page | Curated group of works shown as a room cover |
| Exhibit | Slider, carousel | Viewing a room's works one at a time |
| Enquire | Add to cart, buy now | The single path to purchase or commission |
| Save for later | Wishlist, favourite | Bookmark a piece |
| One of one | Limited edition, exclusive | Never reproduced or printed |
| Texture paste | Plaster, putty, clay | Modelling paste spread and sculpted with a knife |
| Relief | 3D effect, thickness | Surface height, always in mm at the tallest point |
| Palette knife | Tool, spatula | Main tool; trowel/putty knife when specific |
| Sgraffito | Scratch effect | Scratching back into a layer to reveal the one below |
| Raking light | Side lighting | Low-angle light that shows relief |
| Commission | Custom order | New piece made to a buyer's size or palette |
| Studio film | Video, reel | Footage of the artist turning/handling the piece |
| What it holds | Description, meaning | The artist's note on what a piece signifies |

### 10. Naming & formatting

| Item | Rule | Example |
|---|---|---|
| Artwork titles | 2–3 words; place, time or feeling + material/colour. Series use "No." | Morning Plaster · Low Tide · Petal Study No. 4 |
| Art rooms | "The ___ Room" or one evocative noun. Signature Pop Colours is the fixed exception | The Bloom Room · The Clay Room · The Grove |
| Pigment names | One lower-case word from food, earth or flowers; spaced caps on swatches | pistachio · clay · bubblegum |
| Dimensions | W × H in cm with a true ×; round works as diameter | 90 × 120 cm · 70 cm diameter |
| Relief | mm at the highest point | 7 mm at the highest ridge |
| Price | ₹, space, Indian grouping, no decimals; "On enquiry" if unpriced | ₹ 84,000 |
| Credit line | Artist, year, size in italic serif | Cozy Texture Art, 2026 · 90 × 120 cm |
| Counters | Two digits with slash, caps | 03 / 10 · Room 01 |
| Section labels | 2–4 words, sentence-like, spaced caps | Featured pieces · How a piece is made |

### 11. Never
Product grids for the catalogue · primary colours · pure black/white · rounded-rectangle buttons · emoji · stock-photo banners · discount badges · exclamation marks · a third typeface · text centred over artwork (except hero C) · harsh, grey texture shadows.

### Tokens (from tokens.json)

```json
{
  "space": [4, 8, 12, 16, 22, 28, 40, 64, 96],
  "layout": { "gutter": "clamp(20px,4vw,56px)", "sectionPadding": "90px-120px", "readingMax": "560px", "rowMax": "1320px" },
  "radius": { "button": "0", "chip": "999px", "canvas": "2px", "circle": "50%", "arch": "50% 50% 2px 2px / 37% 37% 2px 2px" },
  "shadow": { "artwork": "0 1px 2px rgba(60,40,20,.12), 0 14px 36px -10px rgba(70,48,28,.32)", "hover": "0 24px 40px -24px rgba(70,50,30,.4)" },
  "border": { "sectionRule": "1.5px solid #2B2622", "divider": "1px dotted rgba(43,38,34,.35)", "input": "1px solid #2B2622 (bottom only)" },
  "motion": { "lightEase": 0.12, "idleDriftAfterMs": 2500, "parallaxMaxPx": 28, "hoverLiftPx": 6, "duration": "0.3s-0.6s", "easing": "ease" },
  "texture": { "defaultElevationDeg": "38-40", "defaultRelief": "3-4.5", "rakingElevationDeg": "12-20", "rakingReliefMax": 5, "neverBelowElevation": 25, "neverAboveRelief": 6 },
  "artworkShapes": { "portrait": "4:5", "square": "1:1", "round": "1:1 circle", "arch": "20:27 half-round top", "landscape": "4:3" },
  "views": ["Front", "Raking light", "Close-up", "In a room", "Side angle", "3D turn", "Studio film"]
}
```
