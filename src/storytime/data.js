/**
 * STORYTIME — content + asset manifest
 *
 * Photography: Unsplash hotlinks (free to use under the Unsplash license).
 * Run `node scripts/localize-images.mjs` to download every image into
 * /public/storytime/img and set VITE_LOCAL_IMAGES=1 to serve them locally.
 * Swap any entry below for final Storytime renders when ready.
 */
const U = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=78`;

const LOCAL = import.meta.env.VITE_LOCAL_IMAGES === '1';

/* Storytime's own scene (public/storytime/img). Crops are generated from hero.jpg by scripts/crops.py */
const OWN = (name) => `/storytime/img/${name}.jpg`;

const RAW = {
  // hero + final atmospheres
  hero_scene: OWN('hero'), // bedroom at blue hour, girl + golden retriever, window to the lake
  final_lake: OWN('lake'), // dusk water & lights (crop)
  bedside: OWN('bedside'), // blanket, mug, warm interior (crop)

  // transformation + real → story
  luna_photo: OWN('girl_dog'), // girl + golden retriever (crop)
  luna_env: OWN('mountains'), // mountain scene (crop)
  real_couple: U('photo-1516589178581-6cd7833ae3b2', 1800),

  // book covers / spreads
  cover_a: OWN('mountains'),
  spread_a: OWN('village'),
  book_open: U('photo-1544947950-fa07a98d237f', 1800),
  book_pages: U('photo-1512820790803-83ca734da794', 1800),
  quiet: OWN('girl_dog'),

  // plans
  plan_starter: U('photo-1544027993-37dbfe43562a', 1100),
  plan_family: U('photo-1516627145497-ae6968895b74', 1100),
  plan_storylover: U('photo-1552053831-71594a27632d', 1100),

  // orbit tiles
  t_child: U('photo-1503454537195-1dcabb73ffb9', 600),
  t_partner: U('photo-1516589178581-6cd7833ae3b2', 600),
  t_parents: U('photo-1511895426328-dc8714191300', 600),
  t_grandparents: U('photo-1495954484750-af469f2f9be5', 600),
  t_friends: U('photo-1529156069898-49953e39b3ac', 600),
  t_pet: U('photo-1548199973-03cce0bbc87b', 600),
  t_birthday: U('photo-1464349095431-e9a21285b5f3', 600),
  t_baby: U('photo-1502086223501-7ea6ecd79368', 600),
  t_home: U('photo-1560448204-e02f11c3d0e2', 600),
  t_wedding: U('photo-1519741497674-611481863552', 600),
  t_friendship: U('photo-1523240795612-9a054b0db644', 600),
  t_family: U('photo-1516627145497-ae6968895b74', 600),
  t_celebration: U('photo-1530103862676-de8c9debad1d', 600),
  t_memory: U('photo-1470252649378-9c29740c9fa8', 600),
  t_moment: U('photo-1490750967868-88aa4486c946', 600),
  t_dog: U('photo-1552053831-71594a27632d', 600),
  t_cat: U('photo-1514888286974-6c03e2ca1dba', 600),
  t_reading: U('photo-1544027993-37dbfe43562a', 600),
  t_beach: U('photo-1505142468610-359e7d316be0', 600),
  t_mountain: U('photo-1506905925346-21bda4d32df4', 600),
  t_night: U('photo-1519681393784-d120267933ba', 600),
  t_portrait: U('photo-1517841905240-472988babdf9', 600),
  t_man: U('photo-1507003211169-0a1dd7228f2d', 600),
  t_lake: U('photo-1500673922987-e212871fec22', 600),
  t_faces: U('photo-1531123897727-8f129e1688ce', 600),
};

export const IMG = Object.fromEntries(
  Object.entries(RAW).map(([k, v]) => [k, LOCAL && v.startsWith('http') ? `/storytime/img/${k}.jpg` : v])
);
/** Image every failed load falls back to (seeded crop), so a blocked host never shows a broken tile. */
export const FALLBACK_IMG = OWN('hero');
export const IMG_REMOTE = RAW;

/* Orbit tiles: varied aspect ratios (w/h). 24 tiles desktop, 12 mobile. */
export const TILES = [
  { key: 't_child', label: 'Children', ar: 0.78 },
  { key: 't_partner', label: 'Partners', ar: 1.25 },
  { key: 't_parents', label: 'Parents', ar: 0.9 },
  { key: 't_grandparents', label: 'Grandparents', ar: 1.1 },
  { key: 't_friends', label: 'Friends', ar: 1.3 },
  { key: 't_pet', label: 'Pets', ar: 0.8 },
  { key: 't_birthday', label: 'Birthdays', ar: 1.0 },
  { key: 't_baby', label: 'A new baby', ar: 0.82 },
  { key: 't_home', label: 'A new home', ar: 1.35 },
  { key: 't_wedding', label: 'Weddings', ar: 0.75 },
  { key: 't_friendship', label: 'Friendship', ar: 1.2 },
  { key: 't_family', label: 'Family', ar: 1.05 },
  { key: 't_celebration', label: 'Celebrations', ar: 0.85 },
  { key: 't_memory', label: 'Memories', ar: 1.4 },
  { key: 't_moment', label: 'Special moments', ar: 0.95 },
  { key: 't_dog', label: 'Pets', ar: 0.8 },
  { key: 't_cat', label: 'Pets', ar: 1.0 },
  { key: 't_reading', label: 'Bedtime', ar: 1.25 },
  { key: 't_beach', label: 'Holidays', ar: 1.3 },
  { key: 't_mountain', label: 'Adventures', ar: 0.88 },
  { key: 't_night', label: 'Night skies', ar: 1.15 },
  { key: 't_portrait', label: 'Someone you love', ar: 0.78 },
  { key: 't_man', label: 'Someone you love', ar: 0.8 },
  { key: 't_faces', label: 'Someone you love', ar: 0.9 },
];

export const HERO_PILLS = ['A bedtime story', 'My partner', 'A new sibling', 'Moving to a new home', 'A gift for grandma'];
export const FINAL_PILLS = ['My child', 'My partner', 'My parents', 'My best friend', 'My pet'];

/**
 * Pricing — monthly values as published on storytime.no (Sep 2026).
 * `oneTime` values could not be verified from this environment and are
 * marked `unverified: true`; replace with the official one-time prices.
 */
export const PLANS = [
  {
    id: 'starter', name: 'Starter', credits: 10, img: 'plan_starter',
    monthly: 'R$ 29,90', oneTime: 'R$ 39,90', unverified: true,
    features: ['Create stories', 'Download online', 'High-quality illustrations'],
  },
  {
    id: 'family', name: 'Family', credits: 50, img: 'plan_family', featured: true, tag: 'Most chosen',
    monthly: 'R$ 79,90', oneTime: 'R$ 99,90', unverified: true,
    features: ['Create stories', 'Download online', 'High-quality illustrations', 'Priority generation'],
  },
  {
    id: 'storylover', name: 'Storylover', credits: 120, img: 'plan_storylover',
    monthly: 'R$ 149,90', oneTime: 'R$ 189,90', unverified: true,
    features: ['Create stories', 'Download online', 'High-quality illustrations', 'Priority generation'],
  },
];

export const TESTIMONIALS = [
  {
    quote: 'We turned one of our favorite memories into something we’ll keep forever.',
    name: 'Mariana & Tomás', role: 'A story for their daughter', avatar: 't_parents', bg: 'book_open',
  },
  {
    quote: 'It captured her personality perfectly. We read it every single night.',
    name: 'Ingrid S.', role: 'A story for her son and their dog', avatar: 't_portrait', bg: 'book_pages',
  },
  {
    quote: 'My grandfather cried. Then he asked for a second copy for his brother.',
    name: 'Henrik L.', role: 'A story for his grandparents', avatar: 't_man', bg: 'bedside',
  },
];

export const FORMATS = [
  { id: 'digital', label: 'Digital' },
  { id: 'printed', label: 'Printed' },
  { id: 'audio', label: 'Audio' },
  { id: 'share', label: 'Share' },
];
