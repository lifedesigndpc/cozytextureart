// Cozy Texture Art — catalogue data. The site renders everything from this file.
// Add a piece: run tools/add_art.py for its images, then add an entry to ARTWORKS (see TEMPLATE below).

// Tag vocabulary. Every tag on a piece must be listed here; the label is what visitors see.
window.TAGS = {
  // subject
  florals: 'Florals',
  botanical: 'Botanical',
  landscape: 'Landscape',
  seascape: 'Seascape',
  celestial: 'Celestial',
  abstract: 'Abstract',
  geometric: 'Geometric',
  arches: 'Arches',
  // colour story
  earthy: 'Earthy tones',
  'pop-pastels': 'Pop pastels',
  neutrals: 'Neutrals',
  // mood
  calm: 'Calm',
  joyful: 'Joyful',
  spiritual: 'Spiritual',
  minimal: 'Minimal'
};

// Art rooms are collections of tags: a piece appears in every room that shares at least one of its tags.
// Rooms with no pieces are hidden. `cover` (optional) is the slug of the piece whose photo fronts the room.
window.ART_ROOMS = [
  { slug: 'bloom-room', name: 'The Bloom Room', sub: 'Florals, petals and peonies',
    text: 'Flowers built petal by petal, each one sculpted in texture paste and lifted off the canvas with the tip of the knife.',
    tags: ['florals', 'botanical'] },
  { slug: 'clay-room', name: 'The Clay Room', sub: 'Earthy tones: oat, sand and terracotta',
    text: 'Colours of unfired clay and old lime walls. Grounding pieces for warm wood and linen homes.',
    tags: ['earthy', 'neutrals'] },
  { slug: 'signature-pop', name: 'Signature Pop Colours', sub: 'The brightest pastels',
    text: 'Bubblegum, aqua, lemon and lilac. The cozy signature palette, made for rooms that want a little joy.',
    tags: ['pop-pastels', 'joyful'] },
  { slug: 'the-grove', name: 'The Grove', sub: 'Fields, tides and gardens',
    text: 'Landscapes you can run a hand across: ridged sand, long grass, slow afternoons outdoors.',
    tags: ['landscape', 'seascape'] }
];

// Palette families for the collection filter.
window.FAMILIES = {
  warm: { label: 'Blush & butter', dots: ['#EFC6C6', '#F3E3B0', '#F2CDB0'] },
  green: { label: 'Sage & pistachio', dots: ['#C9D8C1', '#D9E4BF', '#CFE6DA'] },
  cool: { label: 'Powder & lilac', dots: ['#C6D8E8', '#D8CDE9', '#C8BEDF'] },
  neutral: { label: 'Oat & clay', dots: ['#EDE3D2', '#E4C7B1', '#D7CBBB'] }
};

window.SUITS = ['Living room', 'Bedroom', 'Entryway', 'Dining', 'Kids room', 'Study'];

/* TEMPLATE — copy, fill in, and add to ARTWORKS. Keep fields in this order.
{
  slug: 'lilac-doorway',                 // URL: /art/lilac-doorway (lower-case, hyphens)
  title: 'Lilac Doorway',                // 2–3 words: place, time or feeling + material/colour. Series use "No."
  year: 2026,
  concept: '',                           // 2–3 lines on what the piece is and how it was made (shown in the exhibit and on the piece page)
  holds: '',                             // "What it holds": one brief note on what it represents
  size: { w: 60, h: 90 },                // cm, width × height. Round works: { d: 70 }
  depth: '',                             // optional, e.g. '3 cm' (canvas depth)
  medium: 'Acrylic colour mixed into texture paste, on canvas',
  shape: 'portrait',                     // portrait | square | round | arch | landscape
  family: 'cool',                        // warm | green | cool | neutral
  palette: [ { name: 'lilac', hex: '#C8BEDF' } ],   // 3–4 pigments from the photo; one lower-case word each
  tags: ['arches', 'calm'],              // from TAGS; these decide which art rooms it joins
  suits: ['Bedroom', 'Entryway'],        // from SUITS
  status: 'available',                   // available | sold | reserved
  featured: false,                       // true = shown in the home page's featured row
  images: {
    front: { src: '/images/art/lilac-doorway/front.webp', w: 1200, h: 1600, alt: '' },
    room:  { src: '/images/art/lilac-doorway/room.webp',  w: 1600, h: 1200, alt: '' }
  }
}
*/
window.ARTWORKS = [
  // ── Signature Pop Colours ──
  {
    slug: 'sherbet-rows',
    title: 'Sherbet Rows',
    year: 2026,
    concept: 'Eighty-one dabs of texture paste, each pressed down and pulled with the palette knife in a single stroke, so every one ends in a soft, rounded lip. Nine rows in three bands, bubblegum, lemon and aqua, laid over a faint pencil grid that still shows between them.',
    holds: 'A sweet-shop counter on a summer holiday, every row a different flavour. It is about the quiet joy of doing one small, satisfying thing again and again until it adds up to something bright.',
    size: { w: 30, h: 42 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'bubblegum', hex: '#D594B4' },
      { name: 'blush', hex: '#E0C2D3' },
      { name: 'lemon', hex: '#ECEB76' },
      { name: 'aqua', hex: '#9BD0C7' }
    ],
    tags: ['pop-pastels', 'joyful', 'abstract', 'geometric'],
    suits: ['Living room', 'Kids room', 'Bedroom'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/sherbet-rows/front.webp', w: 1131, h: 1600, alt: 'Sherbet Rows: nine rows of rounded texture-paste dabs in bubblegum pink, lemon and aqua on white canvas' },
      room:  { src: '/images/art/sherbet-rows/room.webp',  w: 1600, h: 1200, alt: 'Sherbet Rows hung above a pale blue sideboard in a sunlit living room' }
    }
  }
];
