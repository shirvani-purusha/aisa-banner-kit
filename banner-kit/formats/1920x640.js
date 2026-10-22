/*
  FORMAT · Website banner, 1920 × 640 px, 64 px safe margin.
  Independently composed (not a crop): text, details and graphic columns.
  Focal region x 0–1500; the graphic is sacrificial. Measurements:
  formats/1920x640.css.
*/
BannerKit.registerFormat('1920x640', {
  label: 'Website banner',
  width: 1920,
  height: 640,
  render: (c, b) => `
    ${b.statusStrip(c)}
    <div class="bk-region bk-region--text">
      ${b.programRow(c)}
      ${b.headline(c)}
      ${b.description(c)}
      <div class="bk-attribution-row" data-part="attribution-block">
        <div class="bk-attribution">
          ${b.attributionHeader(c)}
          ${b.partnerLine(c)}
        </div>
        ${b.logoSlots(c)}
      </div>
    </div>
    <div class="bk-region bk-region--details">
      ${b.dateTime(c, { stacked: true })}
      ${b.venue(c)}
      <div class="bk-cta-group" data-part="cta-area">
        ${b.cta(c)}
        ${b.ctaNote(c)}
      </div>
    </div>
    ${b.graphic('1920x640')}`,
});
