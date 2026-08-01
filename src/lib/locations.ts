export type Region = 'coastal-north' | 'central' | 'inland-north' | 'east-county' | 'south-bay';

export interface Location {
  slug: string;
  name: string;
  region: Region;
  /** Short area description — general character of the city/neighborhood. */
  about: string;
  /** Pool-service-specific angle for this area, keeps each page from being a template swap. */
  poolNote: string;
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
  },
  {
    slug: 'vista',
    name: 'Vista',
    region: 'inland-north',
    about:
      'Vista is an inland North County city with a mix of agriculture, light industry, and residential neighborhoods spread across rolling hills.',
    poolNote:
      "We cover Vista on the same North Inland route as San Marcos and Escondido, which keeps scheduling flexible for both weekly service and one-off repair visits.",
  },
  {
    slug: 'encinitas',
    name: 'Encinitas',
    region: 'coastal-north',
    about:
      'Encinitas is a North County coastal city famous for its surf breaks, beaches, and a laid-back, health-conscious lifestyle.',
    poolNote:
      "Like the rest of the North Coastal corridor, Encinitas pools deal with salt air corrosion — we default to corrosion-resistant hardware recommendations when equipment needs replacing here.",
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

  const sameRegion = LOCATIONS.filter((l) => l.region === current.region && l.slug !== slug);
  const rest = LOCATIONS.filter((l) => l.region !== current.region && l.slug !== slug);

  return [...sameRegion, ...rest].slice(0, count);
}
