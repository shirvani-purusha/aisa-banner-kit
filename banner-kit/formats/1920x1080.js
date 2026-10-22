/*
  FORMAT · Main digital banner, 1920 × 1080 px, 96 px safe margin.
  Text column on cols 1–5, graphic on cols 6–8, attribution and CTA on the
  bottom margin. Measurements: formats/1920x1080.css.
*/
BannerKit.registerFormat('1920x1080', {
  label: 'Main digital banner',
  width: 1920,
  height: 1080,
  render: (c, b) => `
    ${b.statusStrip(c)}
    <div class="bk-region bk-region--text">
      ${b.programRow(c)}
      ${b.headline(c)}
      ${b.description(c)}
      ${b.dateTime(c)}
      ${b.venue(c)}
    </div>
    ${b.graphic('1920x1080')}
    <div class="bk-region bk-region--footer">
      <div class="bk-attribution" data-part="attribution-block">
        ${b.attributionHeader(c)}
        ${b.partnerLine(c)}
        ${b.logoSlots(c)}
      </div>
      <div class="bk-cta-group" data-part="cta-area">
        ${b.cta(c)}
        ${b.ctaNote(c)}
      </div>
    </div>`,
});
