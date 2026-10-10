/* ============================================================
   RAJ MAHAL ROORKEE - CONTENT SOURCE OF TRUTH
   Single hotel: Hotel Rajmahal (Rampur, NH-73, Roorkee).
   ============================================================ */

export const brand = {
  hindi: "राज महल",
  latin: "Raj Mahal",
  city: "Roorkee",
  state: "Uttarakhand",
  tagline: "Three days of arriving, one hour of leaving.",
  established: 1998,
  phone: "+91 70557 05692",
  email: "concierge@hotelrajmahalroorkee.in",
  social: {
    instagram: "https://instagram.com/hotelrajmahalroorkee",
    facebook: "https://facebook.com/hotelrajmahalroorkee",
  },
} as const;

/* ----- Single hotel entity ----- */
export const hotel = {
  slug: "rooms",
  name: "Hotel Rajmahal",
  shortName: "Rajmahal",
  address: "Delhi-Dehradun Road (NH-73), Rampur",
  cityLine: "Roorkee, Haridwar District, Uttarakhand 247667",
  phone: brand.phone,
  email: brand.email,
  star: "3-4 star transit & event hotel",
  founded: brand.established,
  checkIn: "12:00 PM to 1:00 PM",
  checkOut: "11:00 AM to 12:00 PM",
  totalRooms: 54,
  coords: { lat: 29.8715, lng: 78.0298 },
  highlights: [
    "On the NH-73 highway",
    "Twelve kilometres from Haridwar",
    "Rooftop swimming pool",
    "The Penthouse rooftop restaurant",
    "Banquet lawns for up to one thousand seated",
  ],
  hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&auto=format&fit=crop&q=85",
} as const;

/* ----- Room typologies (real ones) ----- */
export const rooms = [
  {
    slug: "executive",
    name: "Executive Room",
    sanskrit: "Mukhya",
    size: "320 sq ft",
    bed: "King, four-poster",
    view: "NH-73 and the foothills",
    features: [
      "Air-conditioned throughout",
      "Flat-screen television, multi-channel",
      "Complimentary Wi-Fi",
      "Work desk and reading lamp",
      "Marble bathroom with rain shower",
      "Private balcony on request",
    ],
    rate: "from 2,800 / night",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&auto=format&fit=crop&q=85",
  },
  {
    slug: "deluxe",
    name: "Deluxe Room",
    sanskrit: "Uttam",
    size: "260 sq ft",
    bed: "Queen, hand-teak frame",
    view: "Poolside garden",
    features: [
      "Air-conditioned throughout",
      "Flat-screen television, multi-channel",
      "Complimentary Wi-Fi",
      "Coffee and tea maker",
      "Selected units with fireplace (winter)",
      "Selected units with balcony",
    ],
    rate: "from 1,900 / night",
    image: "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=1600&auto=format&fit=crop&q=85",
  },
  {
    slug: "family",
    name: "Family Room",
    sanskrit: "Parivar",
    size: "480 sq ft",
    bed: "King and twin, separated",
    view: "Garden or poolside",
    features: [
      "Air-conditioned across two rooms",
      "Two flat-screen televisions",
      "Complimentary Wi-Fi",
      "Two-bathroom layout",
      "Coffee and tea maker",
      "Up to two children under eight stay free",
    ],
    rate: "from 3,600 / night",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&auto=format&fit=crop&q=85",
  },
  {
    slug: "suite",
    name: "Heritage Suite",
    sanskrit: "Viraaj",
    size: "640 sq ft",
    bed: "King, canopied",
    view: "Foothills, panoramic",
    features: [
      "Air-conditioned living room",
      "Whirlpool bath",
      "Complimentary airport transfer from Dehradun",
      "Personal butler on call",
      "Walk-in wardrobe",
      "Complimentary breakfast for two",
    ],
    rate: "from 5,400 / night",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d36804?w=1600&auto=format&fit=crop&q=85",
  },
] as const;

/* ----- The Penthouse restaurant (multi-cuisine) ----- */
export const dining = {
  penthouse: {
    name: "The Penthouse",
    tagline: "Roof. Kitchen. Sky.",
    concept: "Multi-cuisine rooftop restaurant on the hotel roof. North Indian, Chinese, Continental. Best booked at sunset.",
    hours: "07:00 AM to 11:00 PM, last order 22:30",
    seats: 96,
  },
  cafe: {
    name: "The Café",
    tagline: "Open around the clock.",
    concept: "Twenty-four hour coffee bar, light pastry counter, fresh juice.",
    hours: "Always",
    seats: 32,
  },
  signatures: [
    { name: "Dal-e-Maa", price: "320", note: "Slow-cooked black lentils, smoked overnight" },
    { name: "Bezawada Biryani", price: "520", note: "Single-dum Andhra biryani, mint and raita" },
    { name: "Hakka Chilli Chicken", price: "440", note: "Indo-Chinese wok-toss" },
    { name: "Saffron Risotto", price: "520", note: "Carnaroli rice, Persian saffron" },
    { name: "Pan-Seared Bhetki", price: "620", note: "River fish, lemon-caper brown butter" },
  ],
  northIndian: [
    { name: "Murgh Musallam", price: "780", note: "Whole roasted chicken, saffron stuffing" },
    { name: "Paneer Korma", price: "420", note: "Cottage cheese in roasted cashew gravy" },
    { name: "Dal Baati Churma", price: "380", note: "Three components, one ritual" },
    { name: "Nalli Nihari", price: "560", note: "Overnight lamb shanks, saffron and rose" },
  ],
  chinese: [
    { name: "Manchurian Veg", price: "320", note: "Cauliflower florets, ginger-soy glaze" },
    { name: "Dragon Prawns", price: "560", note: "Tandoor-smoked tiger prawns" },
    { name: "Lamb Szechuan", price: "520", note: "Whole chilli, Sichuan pepper" },
  ],
  continental: [
    { name: "Wild Mushroom Tagliatelle", price: "460", note: "House-pulled pasta, thyme butter" },
    { name: "Grilled Lamb Chops", price: "780", note: "Rosemary jus, twice-cooked potatoes" },
    { name: "Truffle Khameeri Roti", price: "140", note: "Slow-fermented, finished with truffle" },
  ],
  breads: [
    { name: "Ulta Tava Paratha", price: "60" },
    { name: "Bukhari Naan", price: "80" },
    { name: "Truffle Khameeri Roti", price: "140" },
    { name: "Missi Roti", price: "60" },
  ],
  sweets: [
    { name: "Gulab Jamun", price: "180" },
    { name: "Shahi Tukda", price: "220" },
    { name: "Ghewar", price: "260" },
  ],
} as const;

/* ----- Weddings & events ----- */
export const events = [
  {
    slug: "wedding",
    name: "Royal Wedding",
    sanskrit: "Vivaah",
    capacity: "up to 800 seated",
    setting: "Main banquet lawn + indoor hall",
    inclusions: ["Two-night property hire", "Twelve-course feast", "Live band for sangeet", "Guest house for 120"],
    startingPrice: "from 2,800 / plate",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=85",
  },
  {
    slug: "anniversary",
    name: "Sangam Anniversary",
    sanskrit: "Rajat Jayanti",
    capacity: "up to 240 seated",
    setting: "Heritage courtyard, candle-lit",
    inclusions: ["Twelve-course tasting menu", "Sitar and tabla duo", "Family-run hospitality"],
    startingPrice: "from 2,400 / plate",
    image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=1600&auto=format&fit=crop&q=85",
  },
  {
    slug: "corporate",
    name: "Corporate Retreat",
    sanskrit: "Sabha",
    capacity: "up to 180 seated",
    setting: "Conference floor + breakout lawn",
    inclusions: ["AV, four-track", "Curated buffet", "Brand activation space", "Twelve sleeping rooms"],
    startingPrice: "from 1,400 / plate",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&auto=format&fit=crop&q=85",
  },
  {
    slug: "festival",
    name: "Festival Feast",
    sanskrit: "Utsav",
    capacity: "up to 1,000 seated",
    setting: "Outdoor, lantern-lit, three days",
    inclusions: ["Live tandoor bar", "Eight regional cuisines", "Folk performance", "Family-run hospitality"],
    startingPrice: "from 950 / plate",
    image: "https://images.unsplash.com/photo-1530103862679-de8e9efd7f57?w=1600&auto=format&fit=crop&q=85",
  },
  {
    slug: "private",
    name: "Private Soiree",
    sanskrit: "Mehfil",
    capacity: "up to 60 seated",
    setting: "Indoor, banquet hall",
    inclusions: ["Wine pairing", "Hand-rolled cigars", "Live ghazal", "Twelve-course tasting"],
    startingPrice: "from 4,200 / plate",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=85",
  },
] as const;

/* ----- Amenities (pool etc.) ----- */
export const amenities = [
  {
    name: "Rooftop swimming pool",
    sanskrit: "Jal Mandir",
    body: "The rooftop pool is the hotel's most photographed feature, often named as a Roorkee highlight. Open 06:00 to 21:00. Lined with cabanas in summer, with warmers in winter.",
    image: "https://images.unsplash.com/photo-1540541338227-384006f1a5ed?w=1600&auto=format&fit=crop&q=85",
  },
  {
    name: "Fitness centre",
    sanskrit: "Vajra",
    body: "A 1,400 square foot gym open to in-house guests. Treadmills, free weights, a yoga room with morning instructor.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&auto=format&fit=crop&q=85",
  },
  {
    name: "Garden and lawns",
    sanskrit: "Vatika",
    body: "An acre of gardens, two acres of lawn. A bird list of fourteen species sighted from the verandah in March.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&auto=format&fit=crop&q=85",
  },
  {
    name: "Banquet halls",
    sanskrit: "Sabhagar",
    body: "Four banquet halls across the property, total indoor capacity of six hundred seated. AV in. Tea by the door.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&auto=format&fit=crop&q=85",
  },
] as const;

/* ----- Legacy / story timeline ----- */
export const legacy = [
  {
    year: "before 1998",
    title: "The name travels",
    body: "Rajmahal is an old hospitality name that you will find on inns from Delhi to Maheshwar. It survives because the formula is unhurried: a room, a meal, a welcome.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop&q=85",
  },
  {
    year: "1998",
    title: "Hotel Rajmahal opens on NH-73",
    body: "The hotel opens on the Delhi-Dehradun highway, on the approach to Roorkee. Built for the highway traveller and the wedding host.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=85",
  },
  {
    year: "2009",
    title: "The banquet halls expand",
    body: "Two lawns and an indoor hall are added, expanding the wedding capacity from one hundred to one thousand seated.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&auto=format&fit=crop&q=85",
  },
  {
    year: "2017",
    title: "The Penthouse opens at the top",
    body: "The rooftop restaurant goes up. A multi-cuisine kitchen, ninety-six seats, the closest seat to the foothills on the corridor.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=85",
  },
  {
    year: "2022",
    title: "The rooftop swimming pool opens",
    body: "The single amenity most asked after: a rooftop swimming pool with cabanas and winter warmers. It is the hotel's most-photographed feature.",
    image: "https://images.unsplash.com/photo-1540541338227-384006f1a5ed?w=1200&auto=format&fit=crop&q=85",
  },
  {
    year: "today",
    title: "Still on the highway",
    body: "We still run the kitchen for twenty-four hours. We still answer the phone on the second ring. The same doorman has been with us for eighteen years.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85",
  },
] as const;

/* ----- Testimonials ----- */
export const testimonials = [
  {
    name: "Mrs. Indrani Mehrotra",
    role: "Wedding host, December 2024",
    quote: "The night before, a storm took the lights. The kitchen still served at midnight. Six hundred guests, by candlelight. I had not known a kitchen could be that loyal.",
    photo: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=600&auto=format&fit=crop&q=85",
  },
  {
    name: "Dr. Anirudh Kale",
    role: "Visiting scholar, Roorkee",
    quote: "On the highway between Delhi and Dehradun, this is the only stop that feels like it understands what a traveller needs at three in the morning. A room. Tea. Quiet.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=85",
  },
  {
    name: "Mr. Rohan Shetty",
    role: "Conference organiser, Delhi office",
    quote: "We tried three properties for the leadership offsite. We came back here for the second year. The pool made the difference. The Penthouse made it stick.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=85",
  },
  {
    name: "Capt. Lakshmi Rao",
    role: "Highway traveller, monthly",
    quote: "I drive this road thirty-eight times a year. I stop here for the tea and the wash, never for the room. The only stop where I am glad to be seen twice in a row.",
    photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=85",
  },
] as const;

/* ----- Journal entries ----- */
export const journal = [
  {
    slug: "on-the-highway",
    date: "October 2025",
    readMinutes: 5,
    title: "On being a highway hotel",
    excerpt: "We sit at kilometre fifty-eight of the Delhi-Dehradun run. Six hundred metres from Haridwar's old toll. The trade is travellers who do not stop unless the sign looks honest.",
    image: "https://images.unsplash.com/photo-1473445735015-694cb38a1fc7?w=1200&auto=format&fit=crop&q=85",
    body: "Highway hotels get a bad name in this country. We are trying to do the opposite. We run the kitchen round the clock. We keep a driver who knows the wash. We post the night's tariff on the sign so the eye doesn't have to ask. Highway hotels live or die by the first two minutes. We have spent twenty-seven years on those two minutes.",
  },
  {
    slug: "the-rooftop-pool-in-january",
    date: "January 2025",
    readMinutes: 4,
    title: "The rooftop pool in January",
    excerpt: "The pool at the top of the hotel runs at thirty degrees in winter. The warmers kick in at sunset. The view across to the foothills is best on the cold mornings.",
    image: "https://images.unsplash.com/photo-1540541338227-384006f1a5ed?w=1200&auto=format&fit=crop&q=85",
    body: "Most rooftop pools in North India close from November to February. Ours does not. We hold the water at thirty. The changeover is small, the result is not. In January we are the only hotel on the corridor with a usable pool. The wedding hosts who book us now understand that.",
  },
  {
    slug: "penthouse-eighteen-years",
    date: "August 2024",
    readMinutes: 6,
    title: "Penthouse: eighteen years of last orders",
    excerpt: "The Penthouse has served its last meal at twenty-three hundred hours, thirteen thousand, four hundred and seventy-one times. The chef has not missed one.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=85",
    body: "The Penthouse opened at the top of the hotel in 2009. It has run since then under the same head chef. His staff arrive at six each morning. They leave at midnight. The kitchen that lives below supplies them. The hotel that lives below the kitchen supplies everyone else.",
  },
  {
    slug: "roorkee-on-a-train",
    date: "March 2025",
    readMinutes: 5,
    title: "Roorkee on a train, in the monsoon",
    excerpt: "The mail train from Old Delhi stops twice a day in Roorkee. We hold a car at the platform for guests who ask. We have not charged for this in twenty-seven years.",
    image: "https://images.unsplash.com/photo-1473445735015-694cb38a1fc7?w=1200&auto=format&fit=crop&q=85",
    body: "We are twelve kilometres from the railway station. The car we hold is free. The driver is paid. The concierge knows the arrival time by heart. This is the kind of service the brochures do not capture. We mention it here, quietly.",
  },
] as const;

/* ----- Gallery seeding ----- */
export const gallery = [
  { id: 1, category: "kitchen", caption: "The Penthouse line at sunset", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&auto=format&fit=crop&q=85" },
  { id: 2, category: "kitchen", caption: "Saffron stock, slow reduction", src: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=1400&auto=format&fit=crop&q=85" },
  { id: 3, category: "kitchen", caption: "Tandoor no. 4, midnight service", src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1400&auto=format&fit=crop&q=85" },
  { id: 4, category: "rooms", caption: "Heritage Suite, evening", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d36804?w=1400&auto=format&fit=crop&q=85" },
  { id: 5, category: "rooms", caption: "Family Room, bedside", src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&auto=format&fit=crop&q=85" },
  { id: 6, category: "rooms", caption: "Executive Room, morning light", src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1400&auto=format&fit=crop&q=85" },
  { id: 7, category: "weddings", caption: "Main banquet lawn", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&auto=format&fit=crop&q=85" },
  { id: 8, category: "weddings", caption: "Royal entry, ceremonial", src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&auto=format&fit=crop&q=85" },
  { id: 9, category: "weddings", caption: "Courtyard, candle-lit", src: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=1400&auto=format&fit=crop&q=85" },
  { id: 10, category: "weddings", caption: "Mehendi, mirror-work", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&auto=format&fit=crop&q=85" },
  { id: 11, category: "pool", caption: "Rooftop, summer afternoon", src: "https://images.unsplash.com/photo-1540541338227-384006f1a5ed?w=1400&auto=format&fit=crop&q=85" },
  { id: 12, category: "pool", caption: "Rooftop, winter sunset", src: "https://images.unsplash.com/photo-1572331165260-3596d04ae3ef?w=1400&auto=format&fit=crop&q=85" },
  { id: 13, category: "property", caption: "Frontage at sunrise", src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=85" },
  { id: 14, category: "property", caption: "Verandah at dusk", src: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1400&auto=format&fit=crop&q=85" },
  { id: 15, category: "property", caption: "The Penthouse entrance", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&auto=format&fit=crop&q=85" },
  { id: 16, category: "roorkee", caption: "Highway NH-73, morning", src: "https://images.unsplash.com/photo-1473445735015-694cb38a1fc7?w=1400&auto=format&fit=crop&q=85" },
  { id: 17, category: "roorkee", caption: "Old bus stand, monsoon", src: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1400&auto=format&fit=crop&q=85" },
  { id: 18, category: "roorkee", caption: "Ganges, twelve kilometres east", src: "https://images.unsplash.com/photo-1561363846-12a7c5b5d8a7?w=1400&auto=format&fit=crop&q=85" },
] as const;

/* ----- Site experience offer (small-hours list) ----- */
export const experiences = [
  {
    title: "Coffee at dawn on the rooftop",
    sanskrit: "Usha",
    body: "The Penthouse opens at six for hotel guests. Filter coffee, an unhurried view of the foothills, often the only seat in town.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Tea at the highway chai-desk",
    sanskrit: "Chai",
    body: "Below the frontage, a small chai counter serves drivers and night-watchmen. Guests are welcome. The chai is the same we serve the kitchen team.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Pool lap before breakfast",
    sanskrit: "Snaan",
    body: "The pool opens at six. The lane line stays. Swim, then the four-bowl thali at the Penthouse.",
    image: "https://images.unsplash.com/photo-1540541338227-384006f1a5ed?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Sunset on the rooftop",
    sanskrit: "Sandhya",
    body: "Tables on the Penthouse south face, a gin cordial and a winter sky. The kitchen will cook whatever you ask for, on the half hour.",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "A slow walk to Haridwar",
    sanskrit: "Yatra",
    body: "Twelve kilometres to Har ki Pauri. The hotel holds a car on call. The driver knows the ghat. He has run this road for nineteen years.",
    image: "https://images.unsplash.com/photo-1561363846-12a7c5b5d8a7?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "A long dinner in the courtyard",
    sanskrit: "Mehfil",
    body: "Twelve courses, candlelit, with tandoor still firing at eleven. Booked for two or two hundred.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Wedding-day breakfast for two",
    sanskrit: "Vivaah",
    body: "The morning after a wedding held at the property, the bride and groom eat at the lawn-side table we set for them. The kitchen sends up its best.",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1400&auto=format&fit=crop&q=85",
  },
  {
    title: "Late-night kitchen tour",
    sanskrit: "Raat",
    body: "The kitchen runs round the clock. Ask the chef and he will show you the tandoor. He will probably offer tea.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1400&auto=format&fit=crop&q=85",
  },
] as const;

/* ----- Navigation ----- */
export const navigation = [
  { href: "/", label: "Palace" },
  { href: "/legacy", label: "Legacy" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Penthouse" },
  { href: "/pool", label: "Pool" },
  { href: "/celebrations", label: "Celebrations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/location", label: "Location" },
  { href: "/gallery", label: "Gallery" },
  { href: "/journal", label: "Journal" },
  { href: "/stay", label: "Reserve" },
] as const;

export const PIC = (seed: string, w = 1600, h = 1100) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type Room = (typeof rooms)[number];
export type EventType = (typeof events)[number];
export type Amenity = (typeof amenities)[number];
export type Testimonial = (typeof testimonials)[number];
export type JournalEntry = (typeof journal)[number];
export type GalleryEntry = (typeof gallery)[number];
