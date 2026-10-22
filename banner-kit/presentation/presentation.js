/*
  PRESENTATION · renderer
  Builds index.html from presentation-content.js. Banners are left as
  [data-banner] slots and filled by BannerKit.mountAll, so editing the
  banner content or tokens updates every artboard and simulation at once.
*/
(function () {
  const Kit = window.BannerKit;
  const esc = Kit.esc;

  const slot = (format) => `<div data-banner="${format}"></div>`;

  function sectionHead(s) {
    return `<div class="pres-section__head"><div class="pres-eyebrow">${esc(s.eyebrow)}</div><div class="pres-section__title">${esc(s.title)}</div></div>`;
  }

  function caption(sim) {
    const title = sim.title ? `<strong>${esc(sim.title)}</strong> ` : '';
    return `<div class="pres-caption" style="max-width:${sim.captionWidth}px">${title}${esc(sim.text)}</div>`;
  }

  // A banner shown at a scale inside a fixed-size frame that clips it.
  function frame(sim, extraStyle = '') {
    const f = Kit.formats[sim.format];
    const [w, h] = sim.frame;
    const [x, y] = sim.offset || [0, 0];
    const focal = sim.focal ? `<div class="pres-focal" style="width:${sim.focal.width}px;height:${sim.focal.height}px"></div>` : '';
    return `<div class="pres-frame" style="width:${w}px;height:${h}px${extraStyle}">` +
      `<div class="pres-frame__inner" style="left:${x}px;top:${y}px;width:${f.width}px;height:${f.height}px;transform:scale(${sim.scale})">${slot(sim.format)}</div>` +
      `${focal}</div>`;
  }

  function simulation(sim) {
    return `<div class="pres-sim">${caption(sim)}${frame(sim)}</div>`;
  }

  function artboard(s) {
    const f = Kit.formats[s.format];
    return `<div id="${s.id}" class="pres-artboard" style="width:${f.width}px;height:${f.height}px">${slot(s.format)}</div>`;
  }

  const renderers = {
    artboard(s) {
      return `<section class="pres-section" data-screen-label="${esc(s.screenLabel)}">${sectionHead(s)}${artboard(s)}</section>`;
    },

    simulations(s) {
      const rows = s.rows.map((row) => `<div class="pres-row">${row.map(simulation).join('')}</div>`).join('');
      return `<section class="pres-section pres-section--simulations" data-screen-label="${esc(s.screenLabel)}">${sectionHead(s)}${rows}</section>`;
    },

    recommendation(s) {
      return `<section class="pres-section" data-screen-label="${esc(s.screenLabel)}">${sectionHead(s)}` +
        `<div class="pres-row pres-row--nowrap">${artboard(s)}${simulation(s.preview)}</div></section>`;
    },

    colorVision(s) {
      const filterDef = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="deuteranopia"><feColorMatrix type="matrix" values="${s.deuteranopiaMatrix}"></feColorMatrix></filter></svg>`;
      const views = s.views.map((v) =>
        `<div class="pres-sim pres-sim--labeled"><div class="pres-view-label">${esc(v.label)}</div>` +
        `${frame({ format: s.format, frame: s.frame, scale: s.scale }, `;filter:${v.filter}`)}</div>`).join('');
      return `<section class="pres-section" data-screen-label="${esc(s.screenLabel)}">${sectionHead(s)}${filterDef}<div class="pres-row pres-row--stretch">${views}</div></section>`;
    },

    rationale(s) {
      const layers = s.layers.map((l) => `<div class="pres-layer"><div class="pres-layer__title">${esc(l.title)}</div><div>${esc(l.body)}</div></div>`).join('');
      const options = s.options.items.map((o) => `<div><div class="pres-option__title">${esc(o.title)}</div>${esc(o.body)}</div>`).join('');
      return `<section class="pres-section pres-section--rationale" data-screen-label="${esc(s.screenLabel)}">${sectionHead(s)}` +
        `<div class="pres-layers">${layers}</div>` +
        `<div class="pres-options"><div class="pres-options__heading">${esc(s.options.heading)}</div><div class="pres-options__grid">${options}</div></div></section>`;
    },
  };

  function header(h) {
    const links = h.links.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join(', ');
    return `<div class="pres-header"><div class="pres-notice">${esc(h.notice)}</div>` +
      `<h1 class="pres-title">${esc(h.title)}</h1>` +
      `<p class="pres-intro">${esc(h.intro)} ${links}.</p></div>`;
  }

  Kit.renderPresentation = function (el) {
    const p = Kit.presentation;
    el.innerHTML = header(p.header) + p.sections.map((s) => {
      const r = renderers[s.type];
      if (!r) throw new Error(`BannerKit: unknown presentation section type "${s.type}"`);
      return r(s);
    }).join('');
    Kit.mountAll(el);
  };
})();
