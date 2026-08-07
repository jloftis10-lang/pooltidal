import type { Faq } from './services';

export type Region = 'coastal-north' | 'central' | 'inland-north' | 'east-county' | 'south-bay';

export interface Location {
  slug: string;
  name: string;
  region: Region;
  /** Short area description — general character of the city/neighborhood. */
  about: string;
  /** Pool-service-specific angle for this area, keeps each page from being a template swap. */
  poolNote: string;

  // Optional richer fields — only render on the page/template when present.
  // Reserved for cities where there's genuinely more useful, factual, non-
  // repetitive content to say; every other city stays on about/poolNote
  // alone rather than getting padded out with filler. See CLAUDE.md.
  /** Real, well-known neighborhoods/areas within the city. */
  neighborhoods?: string[];
  /** Concrete, factual pool-care considerations specific to this area. */
  localPoolChallenges?: string[];
  /** Extra intro paragraph beyond `about`, when there's more worth saying. */
  intro?: string;
  /** Practical routing/scheduling note, distinct from poolNote's care angle. */
  serviceNotes?: string;
  /** City-specific Q&A — only shown (and only emits FAQPage schema) when set. */
  faq?: Faq[];
  /** Manual override for the "also serving nearby" list; falls back to the
   *  auto-computed same-region list (getNearbyLocations) when unset. */
  relatedLocations?: string[];
  /** Priority city for richer local-SEO architecture — used to sort these
   *  cities first within their region on the /locations index. */
  featured?: boolean;
}

export const REGION_LABELS: Record<Region, string> = {
  'coastal-north': 'North Coastal',
  central: 'Central San Diego',
  'inland-north': 'North Inland',
  'east-county': 'East County',
  'south-bay': 'South Bay',
};

export const LOCATIONS: Location[] = [
  {
    slug: 'san-diego',
    name: 'San Diego',
    region: 'central',
    about:
      "San Diego is the county seat and California's second-largest city, stretching from Balboa Park and downtown out to dozens of coastal and canyon-side neighborhoods. With a naval presence, a huge mix of housing stock, and a near-year-round outdoor season, it's the anchor market for pool ownership across the county.",
    poolNote:
      "Older Spanish-and-mid-century homes near Balboa Park and North Park often carry original plaster and equipment that's overdue for a refresh, while newer builds out toward Mira Mesa and Rancho Bernardo lean on automated systems that still need a trained eye on chemistry and filtration.",
    neighborhoods: ['Balboa Park & North Park', 'Point Loma', 'Pacific Beach', 'La Jolla', 'Mira Mesa', 'Rancho Bernardo'],
    localPoolChallenges: [
      'Coastal neighborhoods like Point Loma, Pacific Beach, and La Jolla deal with salt-air corrosion on pool hardware',
      'Inland neighborhoods like Mira Mesa and Rancho Bernardo see higher summer heat, which speeds up chlorine burn-off and evaporation',
      'Older homes near Balboa Park and North Park often still have original plaster and equipment overdue for an inspection',
    ],
    serviceNotes:
      "San Diego is split across several regional routes rather than one — tell us your neighborhood and we'll confirm which route covers it.",
    faq: [
      {
        question: 'What parts of San Diego do you cover?',
        answer:
          "We route the city by neighborhood — coastal areas like Point Loma and Pacific Beach, central neighborhoods like North Park, and inland communities like Mira Mesa and Rancho Bernardo. Tell us your neighborhood and we'll confirm which route covers it.",
      },
      {
        question: 'Do coastal and inland San Diego pools get the same service?',
        answer:
          'The core visit is the same, but coastal pools get closer attention to equipment corrosion from salt air, while inland pools get closer chemical monitoring during peak summer heat.',
      },
    ],
    featured: true,
  },
  {
    slug: 'chula-vista',
    name: 'Chula Vista',
    region: 'south-bay',
    about:
      "Chula Vista is a charter city south of downtown San Diego with one of the fastest-growing populations in the county and a economy that spans biotech, retail, and new master-planned communities toward Otay Ranch.",
    poolNote:
      "Many of Chula Vista's newer developments in Otay Ranch and Eastlake feature HOA-governed community pools alongside private backyard pools — we service both, and know the paperwork HOAs typically want from a vendor.",
  },
  {
    slug: 'carlsbad',
    name: 'Carlsbad',
    region: 'coastal-north',
    about:
      'Carlsbad is a North County coastal city known for its beaches, flower fields, and Legoland California, with a mix of oceanfront estates and family neighborhoods further inland.',
    poolNote:
      "Salt air off the coast accelerates corrosion on pool hardware and metal fixtures faster than inland areas, so Carlsbad pools typically need more frequent equipment inspection than the same setup a few miles inland.",
    neighborhoods: ['Carlsbad Village', 'La Costa', 'Aviara', 'Calavera Hills'],
    localPoolChallenges: [
      'Salt air off the coast accelerates hardware corrosion, consistent with the rest of the North Coastal corridor',
      'Family neighborhoods near the beaches and Legoland often see heavy seasonal guest use',
      'Larger La Costa and Aviara properties sometimes include spas or water features that add to the service scope',
    ],
    serviceNotes: 'We cover Carlsbad Village, La Costa, Aviara, and Calavera Hills on our North Coastal route.',
    faq: [
      {
        question: 'Do you handle pools with attached spas or water features?',
        answer:
          'Yes — many Carlsbad properties, especially in La Costa and Aviara, have spas or water features attached to the pool, which we service as part of the same visit.',
      },
      {
        question: 'What parts of Carlsbad do you serve?',
        answer: 'All of it — Carlsbad Village, La Costa, Aviara, Calavera Hills, and the areas between.',
      },
    ],
    featured: true,
  },
  {
    slug: 'escondido',
    name: 'Escondido',
    region: 'inland-north',
    about:
      'Escondido is an inland North County city with a historic downtown, several wineries, and a warmer, drier microclimate than the coast.',
    poolNote:
      "Escondido's higher inland temperatures mean faster evaporation and quicker chlorine burn-off in summer, so we tend to check chemical levels more often here than on comparable coastal routes.",
  },
  {
    slug: 'el-cajon',
    name: 'El Cajon',
    region: 'east-county',
    about:
      'El Cajon, often called the "Gateway to the Mountains," sits in East County with a mix of established residential neighborhoods and commercial corridors along Main Street and Fletcher Parkway.',
    poolNote:
      'East County heat spikes in summer push pool equipment harder — we keep an eye on pump and filter strain on El Cajon routes during the hottest months rather than waiting for a breakdown call.',
  },
  {
    slug: 'la-mesa',
    name: 'La Mesa',
    region: 'east-county',
    about:
      'La Mesa is a suburban East County city with a walkable downtown village, strong community events calendar, and a large stock of mid-century homes with in-ground pools.',
    poolNote:
      "A lot of La Mesa's pools date back decades — we regularly work with older plaster, tile, and equipment that needs careful diagnosis rather than blanket replacement.",
  },
  {
    slug: 'national-city',
    name: 'National City',
    region: 'south-bay',
    about:
      'National City is one of the oldest incorporated cities in the county, with a rich cultural heritage and a mix of historic and newer residential pockets in the South Bay.',
    poolNote:
      'We route National City alongside our other South Bay stops (Chula Vista, Imperial Beach), which keeps response times tight for both scheduled cleanings and repair calls in the area.',
  },
  {
    slug: 'oceanside',
    name: 'Oceanside',
    region: 'coastal-north',
    about:
      'Oceanside is a North County coastal city built around its harbor, beaches, and a significant Marine Corps presence at nearby Camp Pendleton.',
    poolNote:
      "Between salt air and the sandy, wind-blown debris common near the harbor and beach neighborhoods, Oceanside pools tend to need more frequent filter and skimmer attention than inland routes.",
    neighborhoods: ['Downtown Oceanside', 'South Oceanside', 'Fire Mountain', 'Rancho del Oro'],
    localPoolChallenges: [
      'Wind-blown sand and salt air near the harbor and coastline add debris and speed up equipment wear',
      'Proximity to Camp Pendleton means a mix of long-term residents and military families with varying pool usage patterns',
    ],
    serviceNotes: 'We cover Downtown Oceanside, South Oceanside, Fire Mountain, and Rancho del Oro on our North Coastal route.',
    faq: [
      {
        question: 'Why does my pool need more filter attention this close to the beach?',
        answer:
          'Wind-blown sand and salt air near the harbor and coastline add debris and accelerate equipment wear faster than inland pools, so we check filters and skimmers more closely here.',
      },
    ],
    featured: true,
  },
  {
    slug: 'poway',
    name: 'Poway',
    region: 'inland-north',
    about:
      'Poway is an inland North County city known for its parks, trail network, and a family-friendly, semi-rural feel with larger lots than much of the county.',
    poolNote:
      "Poway's larger properties often mean bigger pools and more surrounding landscaping — we plan extra time on these routes for the additional surface area and debris load from mature trees.",
  },
  {
    slug: 'san-marcos',
    name: 'San Marcos',
    region: 'inland-north',
    about:
      'San Marcos is home to California State University San Marcos and a growing tech and business sector, with a fast-expanding residential footprint in North County.',
    poolNote:
      'A lot of San Marcos construction is newer, which means variable-speed pumps and automated salt systems — we stay current on the specific equipment brands common in these builds.',
    neighborhoods: ['San Elijo Hills', 'Discovery Hills', 'Twin Oaks Valley'],
    localPoolChallenges: [
      'Newer construction citywide means variable-speed pumps and automated salt systems are common',
      'Inland heat increases evaporation and chlorine demand compared to coastal routes',
    ],
    serviceNotes:
      'We service San Elijo Hills, Discovery Hills, Twin Oaks Valley, and the rest of San Marcos on our North Inland route alongside Vista and Escondido.',
    faq: [
      {
        question: 'Do you work on newer automated pool systems?',
        answer:
          'Yes — a lot of San Marcos construction is newer and includes variable-speed pumps and automated salt systems, which is equipment we regularly service.',
      },
    ],
    featured: true,
  },
  {
    slug: 'santee',
    name: 'Santee',
    region: 'east-county',
    about:
      'Santee is a suburban East County city built around Santee Lakes and several community parks, with a strong family and outdoor-recreation culture.',
    poolNote:
      "Santee's inland heat runs similar to El Cajon — expect closer chemical monitoring in peak summer to keep chlorine demand and algae risk in check.",
  },
  {
    slug: 'solana-beach',
    name: 'Solana Beach',
    region: 'coastal-north',
    about:
      'Solana Beach is a small, upscale coastal city known for its art galleries, boutique shopping, and bluff-top ocean views.',
    poolNote:
      "Solana Beach's smaller footprint and premium properties mean we can offer tight, predictable scheduling windows here as part of our broader North Coastal route.",
    neighborhoods: ['Eden Gardens', 'Downtown Solana Beach', 'Lomas Santa Fe'],
    localPoolChallenges: [
      'A high share of premium coastal properties, often with custom pool features',
      'Salt air corrosion applies here too, consistent with the rest of the North Coastal corridor',
    ],
    faq: [
      {
        question: 'Is Solana Beach part of a regular route, or a special trip?',
        answer:
          "It's part of our regular North Coastal route alongside Encinitas, Carlsbad, and Del Mar, so scheduling is just as reliable as anywhere else we serve.",
      },
    ],
    featured: true,
  },
  {
    slug: 'vista',
    name: 'Vista',
    region: 'inland-north',
    about:
      'Vista is an inland North County city with a mix of agriculture, light industry, and residential neighborhoods spread across rolling hills.',
    poolNote:
      "We cover Vista on the same North Inland route as San Marcos and Escondido, which keeps scheduling flexible for both weekly service and one-off repair visits.",
    neighborhoods: ['Downtown Vista', 'Shadowridge', 'Rancho Buena Vista'],
    localPoolChallenges: [
      'Inland heat means faster evaporation and chlorine burn-off than coastal routes',
      'A mix of older agricultural-era properties and newer developments means a wide range of pool ages and equipment',
    ],
    serviceNotes: 'We cover Downtown Vista, Shadowridge, and Rancho Buena Vista on the same North Inland route as San Marcos and Escondido.',
    faq: [
      {
        question: 'What areas of Vista do you serve?',
        answer: 'Downtown Vista, Shadowridge, Rancho Buena Vista, and the surrounding neighborhoods, all on our regular North Inland route.',
      },
    ],
    featured: true,
  },
  {
    slug: 'encinitas',
    name: 'Encinitas',
    region: 'coastal-north',
    about:
      'Encinitas is a North County coastal city famous for its surf breaks, beaches, and a laid-back, health-conscious lifestyle.',
    poolNote:
      "Like the rest of the North Coastal corridor, Encinitas pools deal with salt air corrosion — we default to corrosion-resistant hardware recommendations when equipment needs replacing here.",
    neighborhoods: ['Leucadia', 'Cardiff-by-the-Sea', 'Olivenhain', 'Old Encinitas', 'New Encinitas'],
    localPoolChallenges: [
      'Coastal salt air accelerates corrosion on pool hardware and metal fixtures',
      'Surf-town lifestyle means many pools see heavy weekend and guest use',
      'Hillside properties in Olivenhain sometimes have less convenient equipment-pad access, which we plan routes around',
    ],
    serviceNotes:
      'We service Leucadia, Cardiff-by-the-Sea, Olivenhain, and both Old and New Encinitas as part of the same North Coastal route.',
    faq: [
      {
        question: 'Do you service Leucadia and Cardiff-by-the-Sea too?',
        answer:
          'Yes — Leucadia, Cardiff-by-the-Sea, Olivenhain, Old Encinitas, and New Encinitas are all part of our regular Encinitas route.',
      },
      {
        question: 'Does the coastal air really affect my pool equipment?',
        answer:
          'Yes — salt-laden air corrodes metal fixtures and equipment faster than it would a few miles inland, so we check hardware more closely on Encinitas visits than on inland routes.',
      },
    ],
    featured: true,
  },
  {
    slug: 'imperial-beach',
    name: 'Imperial Beach',
    region: 'south-bay',
    about:
      "Imperial Beach is the county's southernmost coastal city, sitting right along the U.S.-Mexico border with a small-town beach-town feel.",
    poolNote:
      'Being right on the coast, Imperial Beach pools get the same salt-air and sand considerations as our North Coastal stops — we service it as part of our South Bay route.',
  },
  {
    slug: 'del-mar',
    name: 'Del Mar',
    region: 'coastal-north',
    about:
      'Del Mar is a small, affluent coastal city known for the Del Mar Racetrack, scenic bluffs, and beaches.',
    poolNote:
      "Del Mar's higher-end properties often have more elaborate pool and spa features (water features, custom lighting, spillovers) — we make sure the tech assigned to these routes is comfortable with that equipment.",
    neighborhoods: ['Del Mar Village', 'Del Mar Heights'],
    localPoolChallenges: [
      'Higher-end properties often have elaborate water features, spillovers, and custom lighting that need a tech comfortable with that equipment',
      'Coastal salt air corrosion applies here as with the rest of the North Coastal corridor',
    ],
    faq: [
      {
        question: 'Do your techs handle custom features like spillovers and pool lighting?',
        answer:
          'Yes — Del Mar has a lot of pools with added features like spillovers and custom lighting, and we assign techs comfortable working around that equipment.',
      },
    ],
    featured: true,
  },
  {
    slug: 'coronado',
    name: 'Coronado',
    region: 'central',
    about:
      'Coronado is an island city connected to San Diego by bridge and ferry, home to historic hotels, wide beaches, and a major naval presence.',
    poolNote:
      "Coronado's island location means constant salt exposure — we recommend more frequent equipment checks here than almost anywhere else on our route map.",
  },
  {
    slug: 'lemon-grove',
    name: 'Lemon Grove',
    region: 'east-county',
    about:
      'Lemon Grove is a small, close-knit East County suburb with local parks and a tight residential community.',
    poolNote:
      "We fold Lemon Grove into our East County route alongside La Mesa and El Cajon, so scheduling stays flexible even for a smaller service area.",
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((location) => location.slug === slug);
}

export function getNearbyLocations(slug: string, count = 4): Location[] {
  const current = getLocation(slug);
  if (!current) return [];

  if (current.relatedLocations?.length) {
    return current.relatedLocations
      .map((s) => getLocation(s))
      .filter((l): l is Location => Boolean(l))
      .slice(0, count);
  }

  const sameRegion = LOCATIONS.filter((l) => l.region === current.region && l.slug !== slug);
  const rest = LOCATIONS.filter((l) => l.region !== current.region && l.slug !== slug);

  return [...sameRegion, ...rest].slice(0, count);
}
