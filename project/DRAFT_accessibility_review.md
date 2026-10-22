# DRAFT accessibility and quality review

DRAFT CONCEPT · EVENT AND CO-SPONSORSHIP UNCONFIRMED. Measured on the provisional colors; re-run if brand assets change anything.

## Measured contrast (WCAG 2.x relative luminance)
| Pair | Ratio | Result | Where used |
|---|---|---|---|
| charcoal #1D1E20 on cream #FFF8F3 | 15.87:1 | Pass AA normal + large | Body, headline, labels, dashed placeholder borders, CTA outline |
| green #2A7A57 on cream #FFF8F3 | 4.97:1 | Pass AA normal + large | Program label, co-branding tag, graphic strokes and circle |
| cream #FFF8F3 on charcoal #1D1E20 | 15.87:1 | Pass AA normal + large | Status strip text |
| charcoal #1D1E20 on green #2A7A57 | 3.19:1 | Large text only; fails normal text | Not used for text |
| green #2A7A57 on charcoal #1D1E20 | 3.19:1 | Large text only; fails normal text | Not used |
| charcoal #1D1E20 on desk #EFE8E2 | 13.75:1 | Pass | Presentation view text |
| green #2A7A57 on desk #EFE8E2 | 4.31:1 | Fails normal text; passes 3:1 graphic | Presentation view: focal-region border only (section labels set in charcoal) |

Graphical boundaries: circle stroke, path strokes and endpoint markers are green or charcoal on cream (≥ 4.97:1), above the 3:1 non-text target.

## Not color alone
- Three paths differ by stroke style (solid / solid / dashed) and color, and end in three marker shapes (circle, square, diamond).
- Draft status is text, not a color tint. Unconfirmed content is bracketed `[CONFIRM: …]` text inside dashed boxes.
- Program label and co-branding tag differ from body by size, tracking and case, not only by green.

## Color-vision and grayscale
Grayscale and an approximate deuteranopia matrix are rendered live in the presentation view. Observed: hierarchy, strip, placeholders and the three path styles remain distinguishable; green reads as a dark mid-tone in grayscale (its luminance contrast on cream is the figure above, unchanged by desaturation).

## Font-missing check
Fonts load from Google Fonts. With fonts blocked, Georgia and Helvetica/Arial substitute; the headline sets slightly wider in Georgia (about +4%) and still fits 2 lines at the placeholder length. Final title length must be re-checked once approved. Exact identity of the campaign fonts is unverified; Libre Baskerville and Barlow are documented stand-ins.

## Spelling and date check
"Friday, November 6, 2026" verified: November 6, 2026 is a Friday. "3:30 p.m." matches the proposal (15:30). Time zone left as a placeholder; if America/New_York is confirmed, the correct abbreviation on that date is EST (DST ends November 1, 2026). "Howard Thurman Center" and "AISA" spelled as in the brief.

## Actual-size legibility
At 1:1 the smallest type is 15 px (logo-slot labels, 1920 × 1080) and 13 px (1920 × 640). Both are placeholder labels that disappear when real logos are placed. Smallest persistent type: 18 px (CTA note) and 16 px (co-branding tag / 640 note). Crop simulations in the presentation view show that the 640 banner becomes unreadable below about 1200 px of container width; a separate mobile layout is recommended rather than a crop.

## Survival of draft labels under cropping
Status strip at top plus a second "Draft · Unconfirmed" tag beside the program label inside the focal region. In the 1920 × 400 cover-center simulation the strip is lost but the in-field tag survives. Attribution and CTA do not survive that crop; flagged as unacceptable without a dedicated composition.

## Other checks
- No clipped glyphs or orphaned words observed at the placeholder lengths (the 640 headline placeholder wraps "title]" alone; re-check with the real title).
- No icons, logos, or QR codes are used, so no unsupported glyphs or logo distortion.
- Backgrounds are opaque cream; no unintended transparency in PNG exports.
- Text alternative: see `DRAFT_text_companion_and_alt_text.md`.

## Open accessibility items
[CONFIRM: accessibility contact or approved alternative] must appear on any public version. Venue accessibility details depend on [CONFIRM: venue and room].
