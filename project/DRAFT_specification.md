# DRAFT specification · Coffee and Conversation banner package

DRAFT CONCEPT · EVENT AND CO-SPONSORSHIP UNCONFIRMED. Review-only. All values in CSS px at 1:1, sRGB.

## Masters and edit workflow
- Primary editable masters (live text, vector graphic, replaceable blocks): `DRAFT_Banner_1920x1080.dc.html`, `DRAFT_Banner_1920x640.dc.html`, `DRAFT_Banner_Mobile_1080x1350.dc.html`. Open any one here; edit copy by clicking text, or open Tweaks to replace the six confirmable fields (event title, description, time zone, venue, CTA, CTA note). Styles are inline on each element.
- Secondary vector masters with live `<text>` elements: `DRAFT_master_1920x1080.svg`, `DRAFT_master_1920x640.svg`. Named groups: `status-strip`, `program-label`, `headline-placeholder`, `description-placeholder`, `proposed-datetime`, `venue`, `discussion-graphic`, `attribution-block`, `logo-slot-aisa`, `logo-slot-htc`, `cta-area`. Positions mirror the HTML masters to within a few px; the HTML masters are authoritative.
- Presentation view: `DRAFT_Review_Presentation.dc.html` (both banners, crop simulations, mobile recommendation, color-vision checks, rationale).

## Color styles (provisional campaign reference, not an official brand guide)
- Cream `#FFF8F3` (field)
- Charcoal `#1D1E20` (text, strips, borders, one graphic path)
- Deep green `#2A7A57` (program label, co-branding tag, graphic strokes)
Rule: charcoal or green on cream for text; cream on charcoal for the status strip. Never charcoal on green or green on charcoal for text (3.19:1).

## Type styles
Headline/dates: Libre Baskerville 400. Labels/body: Barlow 400/500/600. Fallbacks if missing: Georgia / "Times New Roman"; "Helvetica Neue" / Helvetica / Arial. Fonts load from Google Fonts (SIL Open Font License); confirm licensing for any other production tool.

Labels: uppercase, letter-spacing 0.12–0.14em, line-height 1. Placeholders: text identical to the field it replaces, inside a 2 px (3 px for headline) dashed charcoal box, radius 4–6 px.

## Artboard 1 · 1920 × 1080
- Safe margin 96 px all sides. Status strip 64 px tall, full width, charcoal; text 24/600 cream, 0.08em; right note 20/500.
- Grid: 8 columns × 188 px, 32 px gutters inside 1728 px. Text column: cols 1–5 (x 96–1164, 1068 px). Graphic: cols 6–8 (x 1196–1824, 628 px).
- Content top y 160. Column stack gap 28 px.
- Program label 24/600 green 0.14em · Draft tag 18/600, 2 px outline pill.
- Headline 96/400 serif, line-height 1.05, −0.01em. Max 2 lines ≈ 40 characters.
- Description 34/400 sans, line-height 1.35, max-width 980. Max 2 lines ≈ 110 characters.
- Date label 20/600 0.12em; date value 40 serif, line-height 1.2, max-width 1000 (wraps to 2 lines with placeholder; 1 line once the time zone is short, e.g. "EST").
- Venue label 20/600; value 30 sans. Max 1 line ≈ 60 characters.
- Bottom row aligned to y 984 (bottom margin): attribution left (label 20/600 + tag 16/600 green outline; partner line 34 serif; two 200 × 72 dashed logo slots, 24 px apart), CTA right (26/600 in 3 px outline pill, 20 × 32 padding; note 18 below, right-aligned).
- Graphic: 628 × 620 box. Circle r 140 at (460, 310), 4 px green stroke, cream fill. Paths 6 px: solid green, solid charcoal, dashed green (18/14). Endpoints: filled circle r 11 (green), 22 px square (charcoal), 22 px rotated square (cream, 4 px green stroke). Paths enter from the left edge at y 90 / 310 / 540.

## Artboard 2 · 1920 × 640 (independently composed)
- Safe margin 64 px. Status strip 48 px; text 20/600, right note 17/500. Content y 112–576.
- Three columns: text x 64–964 (900), details x 1028–1488 (460), graphic x 1524–1856 (332). 64 px column gaps.
- Program label 20/600; tag 15/600. Headline 60/400 serif, lh 1.05, max 2 lines ≈ 44 characters. Description 26, lh 1.35, max-width 860, max 2 lines ≈ 100 characters.
- Attribution pinned to column bottom: label 16/600, tag 13/600, partner line 26 serif, logo slots 160 × 56.
- Details column: date label 16/600, date value 30 serif on two lines; venue label 16/600, value 24; CTA 22/600 in 3 px pill (16 × 26 padding) pinned to bottom; note 16.
- Graphic 332 × 464: circle r 96 at (232, 232); paths 5 px entering at y 70 / 232 / 400.
- Focal region: x 0–1500, full height. The graphic is sacrificial.

## Mobile recommendation · 1080 × 1350 (illustrative; platform size unconfirmed)
Safe margin 64. Strip 56 (22/600). Single column, gap 24: label 24 + tag 17 · headline 78 serif lh 1.08 · description 30 · date 36 serif · venue 28 · graphic 952 × 300 · attribution (30 serif, slots 180 × 64) · CTA 24/600. Below ~600 px display width, serve live HTML text rather than a raster.

## Co-branding clear space
Logo slots are placeholders only. Reserve clear space equal to the slot height (72 / 56 / 64 px) on all sides of a real logo; never scale logos non-uniformly; follow partner brand rules when supplied. Do not add BU or additional club marks without approval.

## Responsive behavior
Unknown site container and crop rules. Recommendation: serve Artboard 2 only in containers ≥ 1200 px wide with `contain` fitting; between 600 and 1200 px serve a re-composed 1200 × 500 variant (not yet produced); below 600 px use the mobile layout or live text. If the site crops with `cover`, keep the crop anchored left so the focal region survives; never anchor center on narrow containers. See the crop simulations in the presentation view.

## Not in scope
No physical banner size, mounting, finishing, bleed, or print resolution. A physical adaptation requires [CONFIRM: vendor, final dimensions, viewing distance, material, finishing, and safe area]. No QR code is drawn; if one is explored later, use a non-scannable box labeled "QR PLACEHOLDER · NO LINK" with a quiet zone of at least 4 modules and a readable URL beside it.
