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
  depth: '',                             // optional, e.g. '3 cm'
  relief: '',                            // optional, e.g. '4 mm' (tallest point). Leave empty if unknown
  medium: 'Texture paste and acrylic on canvas',
  shape: 'portrait',                     // portrait | square | round | arch | landscape
  family: 'cool',                        // warm | green | cool | neutral
  palette: [ { name: 'lilac', hex: '#C8BEDF' } ],   // 3–4 pigments from the photo; one lower-case word each
  tags: ['arches', 'calm'],              // from TAGS; these decide which art rooms it joins
  suits: ['Bedroom', 'Entryway'],        // from SUITS
  status: 'available',                   // available | sold | reserved
  featured: false,                       // true = eligible for the home hero and featured row
  images: {
    front: { src: '/images/art/lilac-doorway/front.webp', w: 1200, h: 1600, alt: '' },
    room:  { src: '/images/art/lilac-doorway/room.webp',  w: 1600, h: 1200, alt: '' }
  }
}
*/
window.ARTWORKS = [
];
