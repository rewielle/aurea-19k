export const AUREA_DATA = {
  brand: {
    name: "AUREA",
    tagline: "Designed around the horizon.",
    concept: "Architecture shaped by light.",
    narrative: "A day above the horizon.",
    manifesto: "Every level changes the way you see the world.",
    description: "AUREA is a landmark residential architecture by the sea. A living architecture that changes with the sun, offering a new perspective at every hour."
  },
  solarPhases: [
    { id: 'sunrise', name: 'Dawn', time: '06:15', label: 'GOLDEN DAWN', theme: 'light', bg: '#F7F3EC', text: '#35322E' },
    { id: 'daylight', name: 'Morning', time: '11:30', label: 'SOLAR DAYLIGHT', theme: 'light', bg: '#F4EFE5', text: '#35322E' },
    { id: 'golden', name: 'Golden Hour', time: '18:42', label: 'GOLDEN HOUR', theme: 'warm', bg: '#EADBC8', text: '#263743' },
    { id: 'dusk', name: 'Dusk', time: '19:45', label: 'TWILIGHT', theme: 'twilight', bg: '#3B4D5B', text: '#F7F3EC' },
    { id: 'night', name: 'Night', time: '22:00', label: 'NOCTURNE', theme: 'dark', bg: '#1E2B35', text: '#F7F3EC' }
  ],
  materials: [
    { name: "Mineral Limestone", color: "#F7F3EC", description: "Pale, sun-cured natural stone from coastal quarries." },
    { name: "Travertine Natural", color: "#CBB89F", description: "Warm porous stone reflecting daylight with tactile depth." },
    { name: "Champagne Bronze", color: "#C8A776", description: "Precision anodized metal that warms under solar rays." },
    { name: "Ocean Mist Glass", color: "#A7B6BC", description: "Low-iron anti-reflective curved glass framing the horizon." },
    { name: "Pale Oak Wood", color: "#D8C8B3", description: "Brushed architectural timber for interior thermal comfort." }
  ],
  explodedLayers: [
    {
      id: "rooftop",
      level: "ROOFTOP",
      title: "Rooftop Amenities & Sky Terrace",
      subtitle: "Sky terrace, infinity pool & horizon deck",
      description: "Open-air sky pavilion elevated 40 stories above sea level featuring a seamless edge-less ocean pool.",
      specs: ["Horizon Infinity Pool", "Sky Lounge Cabanas", "Observation Deck"]
    },
    {
      id: "sky",
      level: "LEVELS 28 – 39",
      title: "Upper Sky Residences",
      subtitle: "Private loggias & 360° ocean perspective",
      description: "Soaring sky homes with double-height ceiling voids and uninterrupted panoramic coastal views.",
      specs: ["360° Uninterrupted View", "4 Bedrooms | 4,200 SF", "Private Elevator Access"]
    },
    {
      id: "horizon",
      level: "LEVELS 06 – 27",
      title: "Horizon Residences",
      subtitle: "Generous terraces, ocean light & sea breeze",
      description: "Fluid indoor-outdoor spaces with deep shaded balcony overhangs designed to filter direct solar light.",
      specs: ["3 Bedrooms | 2,815 SF", "Wraparound Terraces", "Travertine Spa Baths"]
    },
    {
      id: "wellness",
      level: "LEVELS 02 – 05",
      title: "Wellness & Amenities Pavilion",
      subtitle: "Thermic spa, hydrotherapy & private dining",
      description: "A sanctuary dedicated to quietude, sea mineral treatments and private gathering spaces.",
      specs: ["Thermal Plunge Pools", "Climate Wine Cellar", "Private Ocean Dining"]
    },
    {
      id: "lobby",
      level: "GROUND LEVEL",
      title: "Arrival & Grand Lobby",
      subtitle: "Double-height travertine portico by the sea",
      description: "Monolithic stone entry framed by ocean reflection pools and 24/7 white-glove concierge.",
      specs: ["Private Porte-Cochère", "Valet & Security", "Ocean Garden Plaza"]
    }
  ],
  floors: [
    {
      level: 5,
      type: "Horizon Residence 05B",
      bedrooms: 3,
      interiorSF: "2,450 SF",
      exteriorSF: "520 SF",
      totalSF: "2,970 SF",
      elevation: "Coastal Waves Vantage (45ft)",
      view: "Direct Coastal Waters & Palm Garden",
      image: "/assets/hero_sea.jpg",
      plan: "/assets/floorplan.jpg"
    },
    {
      level: 12,
      type: "Horizon Residence 12A",
      bedrooms: 3,
      interiorSF: "2,680 SF",
      exteriorSF: "580 SF",
      totalSF: "3,260 SF",
      elevation: "Mid-Horizon Vantage (110ft)",
      view: "Panoramic Pacific Ocean Line",
      image: "/assets/interior_living.jpg",
      plan: "/assets/floorplan.jpg"
    },
    {
      level: 20,
      type: "Mid Sky Residence 20A",
      bedrooms: 4,
      interiorSF: "2,815 SF",
      exteriorSF: "645 SF",
      totalSF: "3,460 SF",
      elevation: "Elevated Sea Sky Vantage (185ft)",
      view: "Expansive Endless Horizon",
      image: "/assets/view_level_20.jpg",
      plan: "/assets/floorplan.jpg"
    },
    {
      level: 32,
      type: "Upper Sky Residence 32A",
      bedrooms: 4,
      interiorSF: "3,550 SF",
      exteriorSF: "810 SF",
      totalSF: "4,360 SF",
      elevation: "Cloud Mist Vantage (300ft)",
      view: "360° Coast & Open Sky Line",
      image: "/assets/view_level_40.jpg",
      plan: "/assets/floorplan.jpg"
    },
    {
      level: 40,
      type: "The Aurea House (Penthouse)",
      bedrooms: 5,
      interiorSF: "5,800 SF",
      exteriorSF: "1,850 SF",
      totalSF: "7,650 SF",
      elevation: "Rooftop Crown (390ft)",
      view: "Private Infinity Edge & Celestial Sky",
      image: "/assets/horizon_pool.jpg",
      plan: "/assets/floorplan.jpg"
    }
  ],
  residenceTypes: [
    {
      id: "horizon",
      name: "HORIZON RESIDENCES",
      tag: "Levels 06 – 27",
      area: "2,815 – 3,460 SF",
      tagline: "Generous residences integrated with panoramic sea loggias.",
      description: "Designed for seamless indoor-outdoor living, with frameless curved sliding glass walls opening onto deep travertine loggias.",
      image: "/assets/interior_living.jpg",
      plan: "/assets/floorplan.jpg"
    },
    {
      id: "sky",
      name: "SKY RESIDENCES",
      tag: "Levels 28 – 39",
      area: "3,550 – 4,360 SF",
      tagline: "Elevated privacy, soaring ceilings and open cloud vistas.",
      description: "Occupying the upper tower tiers with elevated ceiling heights, private elevator foyers, and master suites positioned for dawn light.",
      image: "/assets/view_level_20.jpg",
      plan: "/assets/floorplan.jpg"
    },
    {
      id: "penthouse",
      name: "THE AUREA HOUSE",
      tag: "Level 40 Penthouse",
      area: "7,650 SF Total",
      tagline: "The crown residence featuring a private rooftop pool & sky garden.",
      description: "An extraordinary dual-level residence surrounded by private open water, infinity plunge pool, and unhindered astronomical sky views.",
      image: "/assets/horizon_pool.jpg",
      plan: "/assets/floorplan.jpg"
    }
  ],
  amenities: [
    {
      title: "Horizon Pool",
      subtitle: "Where water meets the sky",
      description: "An elevated cantilevered infinity pool designed to visually dissolve into the sea horizon.",
      image: "/assets/horizon_pool.jpg"
    },
    {
      title: "Wellness Pavilion",
      subtitle: "Thermic spa & hydrotherapy",
      description: "Travertine mineral pools, steam room, cold plunge, and private oceanfront treatment suites.",
      image: "/assets/wellness_pavilion.jpg"
    },
    {
      title: "Private Dining & Wine Cellar",
      subtitle: "Curated gastronomic sanctuary",
      description: "Climate-controlled vintage storage and private sommelier dining room overlooking twilight waters.",
      image: "/assets/interior_living.jpg"
    },
    {
      title: "Coastal Concierge",
      subtitle: "Unobtrusive white-glove service",
      description: "Dedicated yacht charters, private transport, and home provisioning available 24 hours a day.",
      image: "/assets/balcony_glass.jpg"
    }
  ]
};
