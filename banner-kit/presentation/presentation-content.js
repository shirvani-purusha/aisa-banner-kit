/*
  PRESENTATION · review page content
  Every section of index.html, in order. Each entry has a type that picks its
  renderer in presentation.js. Add, remove or reorder entries freely.

  Crop simulations: frame is the simulated container (px on this page);
  scale and offset place the full banner inside it. A focal box draws the
  dashed focal-region outline at frame coordinates.
*/
window.BannerKit = window.BannerKit || {};

BannerKit.presentation = {
  header: {
    notice: 'DRAFT CONCEPT · EVENT AND CO-SPONSORSHIP UNCONFIRMED',
    title: 'Coffee and Conversation · banner review package (DRAFT v0.1)',
    intro: 'Proposed AISA × Howard Thurman Center collaboration. All bracketed items are unconfirmed. Review mockups only; no public-release variant exists. Companion documents:',
    links: [
      { label: 'specification', href: '../project/DRAFT_specification.md' },
      { label: 'accessibility review', href: '../project/DRAFT_accessibility_review.md' },
      { label: 'text companion and alt text', href: '../project/DRAFT_text_companion_and_alt_text.md' },
      { label: 'approval checklist and export manifest', href: '../project/DRAFT_approval_checklist_and_export_manifest.md' },
    ],
  },

  sections: [
    {
      type: 'artboard',
      screenLabel: 'Artboard 1',
      eyebrow: 'Artboard 1',
      title: 'Main digital banner · 1920 × 1080 px · sRGB · 96 px safe margin',
      id: 'art-1080',
      format: '1920x1080',
    },
    {
      type: 'artboard',
      screenLabel: 'Artboard 2',
      eyebrow: 'Artboard 2',
      title: 'Website banner · 1920 × 640 px · sRGB · 64 px safe margin · independently composed',
      id: 'art-640',
      format: '1920x640',
    },
    {
      type: 'simulations',
      screenLabel: 'Focal region and crop simulations',
      eyebrow: 'Website banner',
      title: 'Focal region and crop simulations · site container and crop rules unknown; these are review simulations',
      rows: [
        [
          {
            text: 'Focal region (dashed green): x 0–1500 px, full height. Text, date, attribution and CTA sit inside it; the graphic on the right is sacrificial. The in-field "Draft · Unconfirmed" tag keeps the status visible if the top strip is cropped.',
            captionWidth: 960,
            format: '1920x640', frame: [960, 320], scale: 0.5, offset: [0, 0],
            focal: { width: 750, height: 320 },
          },
        ],
        [
          {
            title: 'Desktop, 1440 px container, contain.',
            text: 'Whole banner at 75%. Smallest type: 15 px status strip, 11 px logo-slot labels (marginal).',
            captionWidth: 720,
            format: '1920x640', frame: [1440, 480], scale: 0.75, offset: [0, 0],
          },
        ],
        [
          {
            title: 'Desktop hero, 1920 × 400 px container, cover-center.',
            text: 'Top strip and lower rows are cut. The in-field draft tag and proposed-date label survive; attribution and CTA do not. Not acceptable without a dedicated 400 px-tall composition.',
            captionWidth: 420,
            format: '1920x640', frame: [960, 200], scale: 0.5, offset: [0, -60],
          },
          {
            title: 'Narrow mobile, 390 × 130 px, contain.',
            text: 'Whole banner at 20%. Headline renders at about 12 px, body at 5 px: unreadable.',
            captionWidth: 390,
            format: '1920x640', frame: [390, 130], scale: 0.203125, offset: [0, 0],
          },
          {
            title: 'Narrow mobile, 390 × 220 px, cover-center.',
            text: 'Banner at 34%, sides cropped by 135 px each. Headline about 21 px; date column cut in half. Unacceptable; use the separate mobile layout below instead.',
            captionWidth: 390,
            format: '1920x640', frame: [390, 220], scale: 0.34375, offset: [-135, 0],
          },
        ],
      ],
    },
    {
      type: 'recommendation',
      screenLabel: 'Mobile layout recommendation',
      eyebrow: 'Recommendation',
      title: 'Separate mobile layout · 1080 × 1350 px shown as an illustration · platform dimensions unconfirmed',
      id: 'art-mobile',
      format: 'mobile-1080x1350',
      preview: {
        text: 'Same layout at a 390 px phone width (36%). Smallest live type is about 6 px here; raster use at this width is not recommended. If the site is responsive, rebuild as live HTML text at this breakpoint instead of serving an image.',
        captionWidth: 390,
        format: 'mobile-1080x1350', frame: [390, 488], scale: 0.3611, offset: [0, 0],
      },
    },
    {
      type: 'colorVision',
      screenLabel: 'Color-blind and grayscale review',
      eyebrow: 'Accessibility',
      title: 'Grayscale and deuteranopia simulations of Artboard 1 (35%) · hierarchy relies on size, weight, borders and marker shapes, not color alone',
      // Approximate deuteranopia matrix for feColorMatrix.
      deuteranopiaMatrix: '0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0',
      views: [
        { label: 'Grayscale', filter: 'grayscale(1)' },
        { label: 'Deuteranopia (approximate matrix)', filter: 'url(#deuteranopia)' },
      ],
      format: '1920x1080', frame: [672, 378], scale: 0.35,
    },
    {
      type: 'rationale',
      screenLabel: 'Design rationale',
      eyebrow: 'Rationale',
      title: 'Identity layer, event layer, and unselected creative options',
      layers: [
        {
          title: 'Reusable AISA identity layer (provisional, not an official brand guide)',
          body: 'Cream #FFF8F3 field, charcoal #1D1E20 text, deep green #2A7A57 emphasis. Libre Baskerville for headlines and dates, Barlow for labels and body. 8-column grid with 32 px gutters, 96 px / 64 px safe margins, small tracked uppercase labels over large serif values, 2 px dashed boxes for any unconfirmed content, 6 px stroke language for graphics.',
        },
        {
          title: 'One-event theme layer (replaceable)',
          body: 'Event title, description, date/venue values, the discussion graphic, and the attribution partner line. The graphic used in the mockup is a neutral conversation treatment: three distinct paths (solid green, solid charcoal, dashed green, each ending in a different marker shape) entering one shared circular field. It does not depict coffee, refreshments, a topic, or any participant.',
        },
      ],
      options: {
        heading: 'Unselected creative options, not an approved topic',
        items: [
          { title: 'Perspectives in dialogue', body: 'Several paths of different stroke styles converging on one shared field (the treatment shown). Neutral; makes no claim about subject matter.' },
          { title: 'Technology in community', body: 'A small grid of nodes with a few deliberate connecting strokes, suggesting clubs and people around a common table. Not drawn; would need approved topic language to avoid implying an agenda.' },
          { title: 'Choices and consequences', body: 'A branching choice map: one path splitting into two or three outcomes. Not drawn; reads as a specific discussion frame and should wait for the approved title.' },
        ],
      },
    },
  ],
};
