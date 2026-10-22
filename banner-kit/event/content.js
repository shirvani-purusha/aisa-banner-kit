/*
  EVENT LAYER · banner copy
  Every word that appears on the three banners. All formats read from here,
  so one edit updates the 1920×1080, the 1920×640 and the mobile layout.

  Confirmable fields are { text, confirmed }. While confirmed is false the
  value is drawn inside a dashed box, the brief's marker for unconfirmed
  content. Set confirmed: true only once the item is approved.

  Release gate: keep the status strip and draft tag until co-sponsorship,
  title, copy, time zone, venue, RSVP and brand assets are all approved
  (see ../project/DRAFT_approval_checklist_and_export_manifest.md).
*/
window.BannerKit = window.BannerKit || {};

BannerKit.content = {
  status: {
    notice: 'DRAFT CONCEPT · EVENT AND CO-SPONSORSHIP UNCONFIRMED',
    note: 'Internal review only · v0.1 · 22 Oct 2026',
  },

  programLabel: 'Coffee and Conversation',
  draftTag: 'Draft · Unconfirmed',

  eventTitle: { text: '[CONFIRM: approved event title]', confirmed: false },
  description: { text: '[CONFIRM: one-sentence description of the discussion]', confirmed: false },

  dateTime: {
    label: 'Proposed date and time',
    date: 'Friday, November 6, 2026',
    time: '3:30 p.m.',
    // If America/New_York is confirmed, Nov 6, 2026 falls in EST, not EDT.
    timeZone: { text: '[CONFIRM: time zone]', confirmed: false },
  },

  venue: {
    label: 'Venue',
    value: { text: '[CONFIRM: venue and room]', confirmed: false },
  },

  attribution: {
    label: 'Proposed collaboration',
    tag: 'Co-branding for approval',
    partners: 'AISA × Howard Thurman Center',
    // Set src to an approved logo file to replace the dashed slot.
    logos: [
      { name: 'AISA logo', note: 'for approval', src: null },
      { name: 'HTC logo', note: 'for approval', src: null },
    ],
  },

  cta: {
    // Do not change to "Register now" until an RSVP destination is approved.
    label: 'Registration details pending',
    note: { text: '[CONFIRM: RSVP requirement and public URL]', confirmed: false },
  },

  // Plain-language alt text for raster exports (live HTML needs none).
  altText: {
    '1920x1080': 'Draft concept banner for a proposed Coffee and Conversation session, marked event and co-sponsorship unconfirmed. Placeholders stand in for the event title and description. Proposed date Friday, November 6, 2026 at 3:30 p.m., time zone and venue to be confirmed. Labeled as a proposed collaboration between AISA and the Howard Thurman Center, with logo spaces marked for approval. Registration details pending. On the right, three lines of different styles meet inside a circle.',
    '1920x640': 'Draft concept website banner for a proposed Coffee and Conversation session, marked unconfirmed. Title and description are placeholders. Proposed date Friday, November 6, 2026, 3:30 p.m., time zone and venue to be confirmed. Proposed collaboration between AISA and the Howard Thurman Center, co-branding for approval. Registration details pending. A small graphic of three lines meeting in a circle sits at the right.',
    'mobile-1080x1350': 'Draft concept mobile banner, unconfirmed, with the same placeholder title, description, proposed date and time, venue, collaboration attribution and registration-pending notice stacked in one column, with three lines meeting in a circle between the venue and the attribution.',
  },
};
