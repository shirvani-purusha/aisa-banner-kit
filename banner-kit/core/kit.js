/*
  CORE · building blocks
  Small functions that turn content (event/content.js) into banner markup.
  A format (formats/*.js) arranges these blocks; its CSS sizes them.

  Public API on window.BannerKit:
    registerFormat(id, { width, height, render })   add a layout
    renderBanner(id, content?)                       HTML string for one banner
    mount(el, id)                                    render into an element
    mountAll(root?)                                  render every [data-banner] slot
*/
(function () {
  const Kit = (window.BannerKit = window.BannerKit || {});
  Kit.formats = Kit.formats || {};

  const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ENTITIES[c]);

  // Plain strings count as confirmed copy; { text, confirmed } objects are confirmable.
  function field(f) {
    if (f && typeof f === 'object') return { text: f.text, confirmed: !!f.confirmed };
    return { text: f, confirmed: true };
  }

  // Inline value: wrapped in a dashed box while unconfirmed.
  function inline(f, name) {
    const v = field(f);
    const attr = name ? ` data-field="${name}"` : '';
    return v.confirmed
      ? `<span${attr}>${esc(v.text)}</span>`
      : `<span class="bk-pending"${attr}>${esc(v.text)}</span>`;
  }

  const pendingClass = (f) => (field(f).confirmed ? '' : ' is-unconfirmed');

  // " · " between inline values. fixSeparators hides the dot when a line
  // break falls next to it, so no line starts or ends on a stray separator.
  const SEP = '<span class="bk-sep"> <span class="bk-sep__mark">·</span> </span>';

  // Building blocks. Each takes the full content object and returns markup.
  const blocks = {
    statusStrip(c, opts = {}) {
      const note = opts.note === false ? '' : `<div class="bk-strip__note" data-field="status.note">${esc(c.status.note)}</div>`;
      return `<div class="bk-strip" data-part="status-strip"><div class="bk-strip__text" data-field="status.notice">${esc(c.status.notice)}</div>${note}</div>`;
    },

    programRow(c) {
      return `<div class="bk-program" data-part="program-label">` +
        `<div class="bk-program__label" data-field="programLabel">${esc(c.programLabel)}</div>` +
        `<div class="bk-tag" data-field="draftTag">${esc(c.draftTag)}</div></div>`;
    },

    headline(c) {
      return `<h1 class="bk-headline${pendingClass(c.eventTitle)}" data-part="headline" data-field="eventTitle">${esc(field(c.eventTitle).text)}</h1>`;
    },

    description(c) {
      return `<p class="bk-description${pendingClass(c.description)}" data-part="description" data-field="description">${esc(field(c.description).text)}</p>`;
    },

    // opts.stacked puts the time on its own line under the date.
    dateTime(c, opts = {}) {
      const d = c.dateTime;
      return `<div class="bk-detail bk-detail--datetime" data-part="proposed-datetime">` +
        `<div class="bk-detail__label">${esc(d.label)}</div>` +
        `<div class="bk-detail__value"><span data-field="dateTime.date">${esc(d.date)}</span>${opts.stacked ? '<br>' : SEP}` +
        `<span data-field="dateTime.time">${esc(d.time)}</span>${SEP}${inline(d.timeZone, 'dateTime.timeZone')}</div></div>`;
    },

    venue(c) {
      return `<div class="bk-detail bk-detail--venue" data-part="venue">` +
        `<div class="bk-detail__label">${esc(c.venue.label)}</div>` +
        `<div class="bk-detail__value">${inline(c.venue.value, 'venue.value')}</div></div>`;
    },

    attributionHeader(c) {
      return `<div class="bk-attribution__header">` +
        `<div class="bk-attribution__label" data-field="attribution.label">${esc(c.attribution.label)}</div>` +
        `<div class="bk-cobrand-tag" data-field="attribution.tag">${esc(c.attribution.tag)}</div></div>`;
    },

    partnerLine(c) {
      return `<div class="bk-partner" data-field="attribution.partners">${esc(c.attribution.partners)}</div>`;
    },

    logoSlots(c) {
      const slots = c.attribution.logos.map((l, i) => l.src
        ? `<div class="bk-logo-slot has-logo" data-part="logo-slot-${i}"><img src="${esc(l.src)}" alt="${esc(l.name)}"></div>`
        : `<div class="bk-logo-slot" data-part="logo-slot-${i}">${esc(l.name)}<br>${esc(l.note)}</div>`);
      return `<div class="bk-logos">${slots.join('')}</div>`;
    },

    cta(c) {
      return `<div class="bk-cta" data-part="cta" data-field="cta.label">${esc(c.cta.label)}</div>`;
    },

    ctaNote(c) {
      return `<div class="bk-cta-note">${inline(c.cta.note, 'cta.note')}</div>`;
    },

    graphic(formatId) {
      return renderGraphic(Kit.graphic, formatId);
    },
  };

  // Discussion graphic, drawn from event/graphic.js. Colors are CSS tokens.
  const tokenColor = (name) => `var(--bk-color-${name})`;

  function renderGraphic(g, formatId) {
    const f = g.formats[formatId];
    if (!f) return '';
    const half = f.markerSize / 2;
    const ring = `<circle cx="${f.field.cx}" cy="${f.field.cy}" r="${f.field.r}" stroke-width="${g.ring.width}" style="fill:${tokenColor(g.ring.fill)};stroke:${tokenColor(g.ring.color)}"></circle>`;
    const paths = f.curves.map((pts, i) => {
      const p = g.paths[i];
      const [s, c1, c2, e] = pts;
      const dash = p.dashed ? ` stroke-dasharray="${f.dash.join(' ')}"` : '';
      return `<path d="M${s[0]} ${s[1]} C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${e[0]} ${e[1]}" stroke-width="${f.strokeWidth}" stroke-linecap="round"${dash} style="stroke:${tokenColor(p.color)}"></path>`;
    });
    const markers = f.curves.map((pts, i) => {
      const p = g.paths[i];
      const [x, y] = pts[3];
      const color = tokenColor(p.color);
      if (p.marker === 'dot') return `<circle cx="${x}" cy="${y}" r="${half}" style="fill:${color}"></circle>`;
      const box = `x="${x - half}" y="${y - half}" width="${f.markerSize}" height="${f.markerSize}"`;
      if (p.marker === 'square') return `<rect ${box} style="fill:${color}"></rect>`;
      return `<rect ${box} stroke-width="${g.diamondStroke}" transform="rotate(45 ${x} ${y})" style="fill:${tokenColor('field')};stroke:${color}"></rect>`;
    });
    return `<svg class="bk-graphic" data-part="discussion-graphic" width="${f.width}" height="${f.height}" viewBox="0 0 ${f.width} ${f.height}" fill="none" aria-hidden="true">${ring}${paths.join('')}${markers.join('')}</svg>`;
  }

  Kit.blocks = blocks;
  Kit.esc = esc;
  Kit.field = field;
  Kit.renderGraphic = renderGraphic;

  Kit.registerFormat = function (id, def) {
    Kit.formats[id] = Object.assign({ id }, def);
  };

  Kit.renderBanner = function (id, content) {
    const f = Kit.formats[id];
    if (!f) throw new Error(`BannerKit: unknown format "${id}"`);
    const c = content || Kit.content;
    return `<div class="bk-banner bk-banner--${id}" data-format="${id}" style="width:${f.width}px;height:${f.height}px">${f.render(c, blocks)}</div>`;
  };

  // Two boxes share a line when their vertical midpoints are within half a line.
  function sameLine(a, b) {
    return Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2) < (b.bottom - b.top) / 2;
  }

  // Line-aware separators: depends on rendered layout, so it runs after every
  // mount and again once web fonts finish loading.
  Kit.fixSeparators = function (root) {
    const seps = [...(root || document).querySelectorAll('.bk-sep')];
    seps.forEach((s) => s.classList.remove('is-line-end'));
    const wrapped = seps.filter((s) => {
      const mark = s.firstElementChild.getBoundingClientRect();
      if (!mark.height) return false;
      const prev = s.previousElementSibling;
      const next = s.nextElementSibling;
      const prevRects = prev ? prev.getClientRects() : [];
      const nextRects = next ? next.getClientRects() : [];
      return (prevRects.length && !sameLine(prevRects[prevRects.length - 1], mark)) ||
        (nextRects.length && !sameLine(nextRects[0], mark));
    });
    wrapped.forEach((s) => s.classList.add('is-line-end'));
  };

  Kit.mount = function (el, id) {
    el.innerHTML = Kit.renderBanner(id);
    Kit.fixSeparators(el);
  };

  Kit.mountAll = function (root) {
    (root || document).querySelectorAll('[data-banner]').forEach((el) => Kit.mount(el, el.dataset.banner));
  };

  if (document.fonts) {
    document.fonts.addEventListener('loadingdone', () => Kit.fixSeparators());
    document.fonts.ready.then(() => Kit.fixSeparators());
  }
})();
