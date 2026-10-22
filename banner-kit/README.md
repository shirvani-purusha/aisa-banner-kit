# Banner kit · Coffee and Conversation (DRAFT)

An implementation of the Claude Design handoff in `../project/`. It covers the
review presentation and the three banner masters, rebuilt so that every element
is named, visible in the source, and editable in one place.

Status: **DRAFT CONCEPT · EVENT AND CO-SPONSORSHIP UNCONFIRMED.** This kit
only produces review files. See the release gate in `event/content.js`.

## Open it

- `index.html` is the review presentation, with both banners, the crop
  simulations, the mobile recommendation, the color-vision checks and the
  rationale. The **Edit content** button opens a live edit panel. Add
  `?noeditor` to hide it.
- `banner.html?format=1920x1080` (or `1920x640`, `mobile-1080x1350`) shows one
  banner at 1:1.

No build step and no dependencies. The pages open straight from disk. Fonts load
from Google Fonts. When offline, the fallbacks in `identity/tokens.css` are used.

## Where everything lives

The structure follows the brief's split between a reusable identity layer
and a replaceable one-event layer.

| To change… | Edit | Notes |
|---|---|---|
| Colors, font families, tracking, borders, radii | `identity/tokens.css` | CSS custom properties. Every banner, the presentation and the graphic read them. |
| Weights, case and borders shared by all formats | `identity/components.css` | One rule per building block (`.bk-headline`, `.bk-cta`, …). |
| Any copy on the banners | `event/content.js` | One object feeds all three formats. |
| Whether a value is still unconfirmed | `event/content.js` | `{ text, confirmed: false }` draws the dashed box. Set `true` once approved. |
| Approved logos | `event/content.js` → `attribution.logos[].src` | An image replaces the dashed slot. |
| The discussion graphic | `event/graphic.js` | Path styles, markers and per-format Bézier points. Markers follow the end points. |
| Sizes and positions for one format | `formats/<format>.css` | Every measurement from the spec, commented. |
| Element order for one format | `formats/<format>.js` | Arranges the building blocks. |
| A new format (say 1200 × 500) | add `formats/1200x500.js` + `.css` | Call `BannerKit.registerFormat`, add geometry in `event/graphic.js`, link both files in the HTML. |
| How a building block is built | `core/kit.js` | `blocks.headline`, `blocks.dateTime`, … |
| Review page sections, captions, crop simulations | `presentation/presentation-content.js` | Data only. Each crop is a frame size, scale and offset. |
| Review page look | `presentation/presentation.css` | |
| Fields in the edit panel | `editor/editor.js` → `FIELDS`, `TOKENS` | |

### Finding an element

Every rendered banner element carries a stable hook:

- `class="bk-…"` for styling (`bk-strip`, `bk-program__label`, `bk-headline`,
  `bk-detail--venue`, `bk-logo-slot`, `bk-cta`, `bk-graphic`, …)
- `data-part="…"` matching the named groups in the SVG masters (`status-strip`,
  `headline`, `proposed-datetime`, `venue`, `discussion-graphic`,
  `attribution-block`, `cta-area`, …)
- `data-field="…"` naming the path in `content.js` that supplies the text

## Edit panel

The panel edits copy, confirmation flags and the three color tokens, and every
banner on the page updates live. Edits are kept in this browser only. The toggle
reads "Edit · local changes" while any are active. **Download content.js**
saves them as a file. Replace `event/content.js` with it to make them
permanent. **Reset** clears them.

## Export PNGs

```
cd banner-kit
npm install
npm run capture
```

This writes `exports/DRAFT_preview_*.png` at exact output size, with a
`.alt.txt` beside each one holding the alt text from `content.js`. It renders
from `content.js`, so download any panel edits first.

## Fidelity

All three banners and the full presentation were rendered in Chromium next
to the Claude Design export and compared pixel by pixel at threshold 0, with
zero differing pixels. The kit then made two deliberate changes.

The "·" separators in the date line are line-aware (`BannerKit.fixSeparators`
in `core/kit.js`). When a line break falls next to one, the dot is hidden, so
no line starts or ends on a stray separator. With the long time zone
placeholder, the export left "3:30 p.m. ·" dangling on the 1920×1080 and
1920×640 banners. The kit drops that dot. A short confirmed value such as
"EST" keeps every separator. Apart from those dots, the output still matches
the export exactly.

Second, in the export, each embedded
banner's runtime overrides the presentation page background with cream
`#FFF8F3`, with `#f0eee6` lower down. This kit uses the `#EFE8E2` canvas color
the presentation file specifies.
