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
      front: { src: '/images/art/sherbet-rows/front.webp', w: 1132, h: 1600, alt: 'Sherbet Rows: nine rows of rounded texture-paste dabs in bubblegum pink, lemon and aqua on white canvas' },
      room:  { src: '/images/art/sherbet-rows/room.webp',  w: 1600, h: 1200, alt: 'Sherbet Rows hung above a pale blue sideboard in a sunlit living room' }
    }
  },
  {
    slug: 'lilac-dahlia-no-1',
    title: 'Lilac Dahlia No. 1',
    year: 2026,
    concept: 'One full bloom built from the outside in: a ring of orchid petals, then rings that soften to lilac and finally white, each petal pressed down with the rounded tip of the knife so it overlaps the one before. A cluster of raised orchid dots sits at the centre.',
    holds: 'The way a flower opens, slowly and then all at once. It is a reminder that softness can hold a quiet kind of strength.',
    size: { w: 30, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'orchid', hex: '#CF8ED2' },
      { name: 'lilac', hex: '#E7D5E9' },
      { name: 'milk', hex: '#F3EFF2' },
      { name: 'plum', hex: '#A9679F' }
    ],
    tags: ['florals', 'pop-pastels', 'calm'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/lilac-dahlia-no-1/front.webp', w: 1600, h: 1600, tight: false, alt: 'Lilac Dahlia No. 1: a round bloom of overlapping texture-paste petals fading from orchid at the edge to white at the centre' },
      room:  { src: '/images/art/lilac-dahlia-no-1/room.webp',  w: 1600, h: 1200, alt: 'Lilac Dahlia No. 1 on a sage-green wall above a wooden sideboard' }
    }
  },
  {
    slug: 'matcha-tide',
    title: 'Matcha Tide',
    year: 2026,
    concept: 'Two broad waves of matcha green, combed into fine parallel ridges that catch the light, drift across the canvas between lanes of rough cream paste. Two forest-green quarter circles anchor opposite corners, their ridges curving like the rings of a tree.',
    holds: 'A slow river through a green valley, the kind of view that lowers your shoulders. It is about letting life flow around the things that keep you grounded.',
    size: { w: 30, h: 42 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'matcha', hex: '#AEC4AF' },
      { name: 'mint', hex: '#C9DCC6' },
      { name: 'cream', hex: '#EEE9E1' },
      { name: 'forest', hex: '#1F4A1C' }
    ],
    tags: ['pop-pastels', 'abstract', 'landscape', 'calm'],
    suits: ['Living room', 'Study', 'Entryway'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/matcha-tide/front.webp', w: 1132, h: 1600, alt: 'Matcha Tide: combed matcha-green waves between cream paste, with forest-green quarter circles in two corners' },
      room:  { src: '/images/art/matcha-tide/room.webp',  w: 1600, h: 1200, alt: 'Matcha Tide on a terracotta wall above a walnut sideboard' }
    }
  },
  {
    slug: 'strawberry-swatches',
    title: 'Strawberry Swatches',
    year: 2026,
    concept: 'Twelve bars of texture paste in two columns on a mint ground, stepping from milk white through blush to deep raspberry. Each pair carries a different knife texture, from soft waves to crumpled peaks, so the colour and the surface change together.',
    holds: 'A swatch card for a strawberry-milk day, every shade of pink side by side. It celebrates the small differences that make each day its own.',
    size: { w: 30, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'mint', hex: '#BFD0C3' },
      { name: 'blush', hex: '#F1C6E3' },
      { name: 'strawberry', hex: '#E299BB' },
      { name: 'raspberry', hex: '#AE5B85' }
    ],
    tags: ['pop-pastels', 'geometric', 'joyful'],
    suits: ['Bedroom', 'Kids room', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/strawberry-swatches/front.webp', w: 1600, h: 1600, tight: false, alt: 'Strawberry Swatches: twelve textured bars stepping from white to deep pink on a mint background' },
      room:  { src: '/images/art/strawberry-swatches/room.webp',  w: 1600, h: 1200, alt: 'Strawberry Swatches on a peach wall above a mint sideboard' }
    }
  },
  {
    slug: 'marigold-scales',
    title: 'Marigold Scales',
    year: 2026,
    concept: 'Overlapping fans of scallops rise like hills, each scallop pressed with the knife so the paste lifts into a raised rim. Pale butter at the top deepens into marigold, then soft celery and a deep pine green in the bottom corner.',
    holds: 'Late-afternoon sun over terraced fields, warm gold giving way to cool green. It is about the comfort of things that build up, layer upon layer, over time.',
    size: { w: 30, h: 42 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'butter', hex: '#F1E3A6' },
      { name: 'marigold', hex: '#C9973F' },
      { name: 'celery', hex: '#D3E2C4' },
      { name: 'pine', hex: '#2F5A33' }
    ],
    tags: ['pop-pastels', 'geometric', 'earthy'],
    suits: ['Living room', 'Dining', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/marigold-scales/front.webp', w: 1132, h: 1600, tight: false, alt: 'Marigold Scales: fans of raised scallop outlines in butter, marigold, celery and pine green' },
      room:  { src: '/images/art/marigold-scales/room.webp',  w: 1600, h: 1200, alt: 'Marigold Scales on a deep green wall above a wooden sideboard' }
    }
  },
  {
    slug: 'sorbet-shells',
    title: 'Sorbet Shells',
    year: 2026,
    concept: 'Rows of small shells run diagonally across the canvas in lemon, peach, sage and lilac. Each shell is pressed in with the knife and fanned with fine ribs, then left glossy so the light runs along every ridge.',
    holds: 'A beach walk with pockets full of shells, sorted by colour. It holds the simple happiness of collecting small, beautiful things.',
    size: { w: 30, h: 42 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'lemon', hex: '#E9E58F' },
      { name: 'peach', hex: '#E3B79E' },
      { name: 'sage', hex: '#B9CDBF' },
      { name: 'lilac', hex: '#BDB3E4' }
    ],
    tags: ['pop-pastels', 'seascape', 'geometric', 'joyful'],
    suits: ['Living room', 'Bedroom', 'Entryway'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/sorbet-shells/front.webp', w: 1132, h: 1600, alt: 'Sorbet Shells: diagonal rows of ribbed shell shapes in lemon, peach, sage and lilac' },
      room:  { src: '/images/art/sorbet-shells/room.webp',  w: 1600, h: 1200, alt: 'Sorbet Shells on a cream wall above a lilac sideboard' }
    }
  },
  {
    slug: 'lilac-dahlia-no-2',
    title: 'Lilac Dahlia No. 2',
    year: 2026,
    concept: 'Two half-blooms reach in from opposite corners, leaving a quiet band of white canvas between them. Petals step from orchid at the edge to lilac and almost white near the centre, each pressed so its rim stands just above the last.',
    holds: 'Two people leaning towards each other across a room. It is about the space in between that still connects them.',
    size: { w: 30, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'orchid', hex: '#C88CC6' },
      { name: 'lilac', hex: '#DABDDE' },
      { name: 'milk', hex: '#F1EEF1' }
    ],
    tags: ['florals', 'pop-pastels', 'calm'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lilac-dahlia-no-2/front.webp', w: 1600, h: 1600, tight: false, alt: 'Lilac Dahlia No. 2: two half-blooms of layered petals reaching in from opposite corners' },
      room:  { src: '/images/art/lilac-dahlia-no-2/room.webp',  w: 1600, h: 1200, alt: 'Lilac Dahlia No. 2 on a warm beige wall above a fluted walnut sideboard' }
    }
  }
];
