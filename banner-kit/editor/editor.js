/*
  EDITOR · optional live edit panel for the review page
  Edits copy, confirmation flags and color tokens in the browser and
  re-renders every banner. Changes are kept in this browser only
  (localStorage); "Download content.js" writes them out so they can replace
  event/content.js, which is the source of truth for PNG exports.

  Add or remove editable fields in FIELDS below.
*/
(function () {
  const Kit = window.BannerKit;
  const STORE_KEY = 'bannerkit:overrides:v1';

  // path into BannerKit.content; confirmable fields are { text, confirmed } objects.
  const FIELDS = [
    { path: 'eventTitle', label: 'Event title', confirmable: true },
    { path: 'description', label: 'Description', confirmable: true, multiline: true },
    { path: 'dateTime.date', label: 'Date' },
    { path: 'dateTime.time', label: 'Start time' },
    { path: 'dateTime.timeZone', label: 'Time zone', confirmable: true },
    { path: 'venue.value', label: 'Venue', confirmable: true },
    { path: 'attribution.partners', label: 'Partner line' },
    { path: 'cta.label', label: 'CTA' },
    { path: 'cta.note', label: 'CTA note', confirmable: true },
    { path: 'programLabel', label: 'Program label' },
    { path: 'status.note', label: 'Status note' },
  ];
  const TOKENS = [
    { name: '--bk-color-field', label: 'Field (cream)' },
    { name: '--bk-color-ink', label: 'Ink (charcoal)' },
    { name: '--bk-color-accent', label: 'Accent (green)' },
  ];

  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  function set(obj, path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    keys.reduce((o, k) => (o[k] = o[k] || {}), obj)[last] = value;
  }
  const clone = (v) => JSON.parse(JSON.stringify(v));

  const original = clone(Kit.content);
  let state = { content: {}, tokens: {} };

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) state = Object.assign({ content: {}, tokens: {} }, JSON.parse(raw));
    } catch (e) { /* storage unavailable: edits last for this page view only */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function apply() {
    Kit.content = clone(original);
    Object.keys(state.content).forEach((p) => set(Kit.content, p, clone(state.content[p])));
    TOKENS.forEach((t) => {
      if (state.tokens[t.name]) document.documentElement.style.setProperty(t.name, state.tokens[t.name]);
      else document.documentElement.style.removeProperty(t.name);
    });
    Kit.mountAll();
    if (toggle) toggle.textContent = hasEdits() ? 'Edit · local changes' : 'Edit content';
  }

  const hasEdits = () => Object.keys(state.content).length > 0 || Object.keys(state.tokens).length > 0;

  function update(path, value) {
    state.content[path] = value;
    save();
    apply();
  }

  function download() {
    const body = `/* Exported from the BannerKit edit panel. Replace event/content.js with this file. */\nwindow.BannerKit = window.BannerKit || {};\n\nBannerKit.content = ${JSON.stringify(Kit.content, null, 2)};\n`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([body], { type: 'text/javascript' }));
    a.download = 'content.js';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  let toggle;
  let panel;

  function buildPanel() {
    panel = document.createElement('aside');
    panel.className = 'bk-editor';
    panel.hidden = true;
    panel.innerHTML = `<div class="bk-editor__head"><strong>Edit banner content</strong><button type="button" data-act="close" aria-label="Close">×</button></div>
      <p class="bk-editor__hint">Changes stay in this browser. Download content.js to make them permanent, or edit identity/tokens.css for colors.</p>`;

    FIELDS.forEach((f) => {
      const value = get(Kit.content, f.path);
      const text = f.confirmable ? value.text : value;
      const row = document.createElement('label');
      row.className = 'bk-editor__field';
      const input = document.createElement(f.multiline ? 'textarea' : 'input');
      input.value = text;
      row.append(f.label, input);
      let check;
      if (f.confirmable) {
        check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = value.confirmed;
        const c = document.createElement('span');
        c.className = 'bk-editor__confirm';
        c.append(check, ' Confirmed');
        row.append(c);
      }
      const commit = () => update(f.path, f.confirmable ? { text: input.value, confirmed: check.checked } : input.value);
      input.addEventListener('input', commit);
      if (check) check.addEventListener('change', commit);
      panel.append(row);
    });

    const styles = getComputedStyle(document.documentElement);
    TOKENS.forEach((t) => {
      const row = document.createElement('label');
      row.className = 'bk-editor__field bk-editor__field--color';
      const input = document.createElement('input');
      input.type = 'color';
      input.value = (state.tokens[t.name] || styles.getPropertyValue(t.name)).trim();
      input.addEventListener('input', () => { state.tokens[t.name] = input.value; save(); apply(); });
      row.append(input, ' ', t.label);
      panel.append(row);
    });

    const actions = document.createElement('div');
    actions.className = 'bk-editor__actions';
    actions.innerHTML = '<button type="button" data-act="download">Download content.js</button><button type="button" data-act="reset">Reset</button>';
    panel.append(actions);

    panel.addEventListener('click', (e) => {
      const act = e.target.dataset && e.target.dataset.act;
      if (act === 'close') panel.hidden = true;
      if (act === 'download') download();
      if (act === 'reset') {
        state = { content: {}, tokens: {} };
        save();
        apply();
        panel.remove();
        buildPanel();
        panel.hidden = false;
      }
    });
    document.body.append(panel);
  }

  Kit.initEditor = function () {
    load();
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'bk-editor-toggle';
    toggle.addEventListener('click', () => { panel.hidden = !panel.hidden; });
    document.body.append(toggle);
    apply();
    buildPanel();
  };
})();
