/*
  EVENT LAYER · discussion graphic
  "Perspectives in dialogue": three distinct paths entering one shared
  circular field. Neutral; it depicts no topic, refreshment or participant.

  paths   the look of each path, shared by every format. color is a token
          name (accent, ink, field); marker is dot, square or diamond.
  formats per-format geometry in px. Each curve is a cubic Bézier given as
          [start, control1, control2, end]; the marker sits on the end point,
          so moving an end point moves its marker too.
*/
window.BannerKit = window.BannerKit || {};

BannerKit.graphic = {
  paths: [
    { color: 'accent', dashed: false, marker: 'dot' },
    { color: 'ink', dashed: false, marker: 'square' },
    { color: 'accent', dashed: true, marker: 'diamond' },
  ],
  ring: { color: 'accent', fill: 'field', width: 4 },
  diamondStroke: 4,

  formats: {
    '1920x1080': {
      width: 628, height: 620,
      field: { cx: 460, cy: 310, r: 140 },
      strokeWidth: 6, dash: [18, 14], markerSize: 22,
      curves: [
        [[0, 90], [220, 90], [280, 220], [410, 260]],
        [[0, 310], [180, 310], [280, 310], [410, 320]],
        [[0, 540], [220, 540], [290, 420], [410, 380]],
      ],
    },
    '1920x640': {
      width: 332, height: 464,
      field: { cx: 232, cy: 232, r: 96 },
      strokeWidth: 5, dash: [14, 11], markerSize: 18,
      curves: [
        [[0, 70], [110, 70], [150, 170], [196, 198]],
        [[0, 232], [90, 232], [140, 232], [196, 238]],
        [[0, 400], [110, 400], [150, 310], [196, 278]],
      ],
    },
    'mobile-1080x1350': {
      width: 952, height: 300,
      field: { cx: 800, cy: 150, r: 112 },
      strokeWidth: 6, dash: [18, 14], markerSize: 22,
      curves: [
        [[0, 40], [300, 40], [480, 110], [760, 120]],
        [[0, 150], [300, 150], [500, 150], [760, 154]],
        [[0, 260], [300, 260], [480, 190], [760, 190]],
      ],
    },
  },
};
