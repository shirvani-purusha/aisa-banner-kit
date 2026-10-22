/*
  FORMAT · Recommended mobile layout, 1080 × 1350 px (illustrative;
  platform dimensions unconfirmed). Single column, 64 px safe margin.
  Below ~600 px display width, serve live HTML text instead of a raster.
  Measurements: formats/mobile-1080x1350.css.
*/
BannerKit.registerFormat('mobile-1080x1350', {
  label: 'Recommended mobile layout',
  width: 1080,
  height: 1350,
  render: (c, b) => `
    ${b.statusStrip(c, { note: false })}
    <div class="bk-region bk-region--text">
      ${b.programRow(c)}
      ${b.headline(c)}
      ${b.description(c)}
      ${b.dateTime(c, { stacked: true })}
      ${b.venue(c)}
      ${b.graphic('mobile-1080x1350')}
      <div class="bk-footer" data-part="attribution-block">
        ${b.attributionHeader(c)}
        ${b.partnerLine(c)}
        ${b.logoSlots(c)}
        <div class="bk-cta-group" data-part="cta-area">
          ${b.cta(c)}
          ${b.ctaNote(c)}
        </div>
      </div>
    </div>`,
});
