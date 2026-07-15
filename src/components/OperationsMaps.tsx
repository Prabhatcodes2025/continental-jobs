type MapLocation = {
  name: string;
  x: number;
  y: number;
  labelX?: number;
  labelY?: number;
  officeLabel?: string;
};

type CountryGroup = {
  title: string;
  items: Array<{ name: string; flag: string; note?: string }>;
};

const eagleMarker = "/brand/continental-eagle-marker.png";

const indianLocations: MapLocation[] = [
  { name: "Cochin", officeLabel: "COCHIN - CORPORATE OFFICE", x: 330, y: 604, labelX: -150, labelY: 2 },
  { name: "Madurai", x: 390, y: 588, labelX: 18, labelY: 2 },
  { name: "Bombay", officeLabel: "OPERATIONS OFFICE - BOMBAY", x: 258, y: 418, labelX: -164, labelY: 2 },
  { name: "Gujarat", x: 216, y: 344, labelX: -86, labelY: -20 },
  { name: "Jaipur", x: 304, y: 252, labelX: -78, labelY: -16 },
  { name: "Delhi", x: 358, y: 218, labelX: 18, labelY: -10 },
  { name: "Kolkata", x: 584, y: 374, labelX: 20, labelY: 2 },
  { name: "Siliguri", x: 558, y: 300, labelX: 20, labelY: -14 },
  { name: "Vizag", x: 500, y: 492, labelX: 18, labelY: 12 }
];

const worldwideLocations: MapLocation[] = [
  { name: "India", x: 665, y: 280, labelX: 16, labelY: 22 },
  { name: "Singapore", x: 735, y: 333, labelX: 18, labelY: 10 },
  { name: "Philippines", x: 805, y: 285, labelX: 16, labelY: -4 },
  { name: "Malaysia", x: 722, y: 322, labelX: -96, labelY: 24 },
  { name: "Dubai / UAE", x: 570, y: 258, labelX: -84, labelY: 18 },
  { name: "Kuwait", x: 552, y: 234, labelX: -70, labelY: -8 },
  { name: "Bahrain", x: 560, y: 244, labelX: 18, labelY: 6 },
  { name: "Oman", x: 586, y: 277, labelX: 18, labelY: 16 },
  { name: "Saudi Arabia", x: 532, y: 268, labelX: -118, labelY: 18 },
  { name: "Qatar", x: 568, y: 252, labelX: 20, labelY: -18 },
  { name: "London / UK", x: 456, y: 132, labelX: -102, labelY: -16 },
  { name: "Malta", x: 492, y: 188, labelX: -58, labelY: 22 },
  { name: "Spain", x: 450, y: 188, labelX: -58, labelY: -18 },
  { name: "Nepal", x: 675, y: 246, labelX: 18, labelY: -18 },
  { name: "Bangladesh", x: 700, y: 276, labelX: 18, labelY: -2 },
  { name: "Sri Lanka", x: 670, y: 326, labelX: 18, labelY: 20 },
  { name: "Africa", x: 486, y: 326, labelX: -120, labelY: 22 }
];

const countryGroups: CountryGroup[] = [
  {
    title: "Middle East",
    items: [
      { name: "Bahrain", flag: "🇧🇭" },
      { name: "Dubai / UAE", flag: "🇦🇪" },
      { name: "Kuwait", flag: "🇰🇼" },
      { name: "Oman", flag: "🇴🇲" },
      { name: "Saudi Arabia", flag: "🇸🇦" },
      { name: "Qatar", flag: "🇶🇦" }
    ]
  },
  {
    title: "Asia",
    items: [
      { name: "India", flag: "🇮🇳" },
      { name: "Nepal", flag: "🇳🇵" },
      { name: "Bangladesh", flag: "🇧🇩" },
      { name: "Sri Lanka", flag: "🇱🇰" }
    ]
  },
  {
    title: "Far East",
    items: [
      { name: "Singapore", flag: "🇸🇬" },
      { name: "Philippines", flag: "🇵🇭" },
      { name: "Malaysia", flag: "🇲🇾" }
    ]
  },
  {
    title: "Europe / UK",
    items: [
      { name: "London / UK", flag: "🇬🇧" },
      { name: "Malta", flag: "🇲🇹" },
      { name: "Spain", flag: "🇪🇸" }
    ]
  },
  {
    title: "Africa",
    items: [{ name: "Africa", flag: "🌍", note: "Regional presence" }]
  }
];

export function IndiaOperationsMap({ locations }: { locations: string[] }) {
  const approved = indianLocations.filter((location) => locations.includes(location.name));

  return (
    <div className="operations-map-shell" aria-label="INDIAN OPERATIONS map with approved Continental locations">
      <div className="operations-map-scroll" role="img" aria-label={`Indian operations: ${approved.map((item) => item.officeLabel || item.name).join(", ")}`}>
        <svg className="operations-svg india-svg" viewBox="0 0 760 720">
          <defs>
            <filter id="india-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#07111f" floodOpacity="0.18" />
            </filter>
          </defs>
          <rect width="760" height="720" rx="18" fill="#ffffff" />
          <path className="map-grid-line" d="M80 96H690M80 188H690M80 280H690M80 372H690M80 464H690M80 556H690" />
          <path className="map-grid-line" d="M128 74V638M248 74V638M368 74V638M488 74V638M608 74V638" />
          <path
            className="india-silhouette"
            filter="url(#india-map-shadow)"
            d="M344 76 386 91 421 128 458 150 494 166 504 206 482 238 520 266 528 302 570 302 588 280 632 292 666 276 710 306 690 344 650 354 616 388 574 382 548 414 560 462 526 498 488 516 468 566 446 648 418 674 398 622 362 584 330 536 302 494 268 476 240 430 194 408 220 360 188 328 206 286 246 262 264 222 306 196 318 150Z"
          />
          <path
            className="state-line"
            d="M318 150 360 210 426 218 482 238M246 262 306 318 386 304 476 324 528 302M206 286 278 358 356 376 456 368 548 414M240 430 326 418 410 456 526 498M302 494 384 514 446 648M360 210 350 374M426 218 404 456M504 206 570 302 616 388M588 280 650 354M268 476 330 536M398 622 420 510"
          />
          <text className="map-watermark" x="380" y="365">INDIA</text>
          <text className="operations-svg-title" x="380" y="56">INDIAN OPERATIONS</text>
          {approved.map((location) => (
            <SvgMarker key={location.name} location={location} />
          ))}
        </svg>
      </div>
      <ReadableLocationList
        title="INDIAN OPERATIONS"
        items={approved.map((location) => location.officeLabel || location.name)}
      />
    </div>
  );
}

export function WorldwideOperationsMap({ regions, showCountryGrid = true }: { regions: string[]; showCountryGrid?: boolean }) {
  const approved = worldwideLocations.filter((location) => regions.includes(location.name));

  return (
    <div className="operations-map-shell" aria-label="WORLDWIDE OPERATIONS map with approved Continental locations">
      <div className="operations-map-scroll" role="img" aria-label={`Worldwide operations: ${approved.map((item) => item.name).join(", ")}`}>
        <svg className="operations-svg world-svg" viewBox="0 0 1000 560">
          <defs>
            <filter id="world-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#07111f" floodOpacity="0.16" />
            </filter>
          </defs>
          <rect width="1000" height="560" rx="18" fill="#ffffff" />
          <path className="map-grid-line" d="M72 112H928M72 210H928M72 308H928M72 406H928" />
          <path className="map-grid-line" d="M180 76V482M340 76V482M500 76V482M660 76V482M820 76V482" />
          <g className="world-silhouette" filter="url(#world-map-shadow)">
            <path d="M113 177 162 130 252 117 316 153 301 209 229 229 203 279 130 266 86 219Z" />
            <path d="M250 293 320 316 347 377 317 461 260 433 231 356Z" />
            <path d="M426 143 494 112 548 132 528 184 471 193 418 176Z" />
            <path d="M500 204 579 183 650 214 633 270 569 274 530 250Z" />
            <path d="M516 282 606 292 635 362 596 452 531 406 483 342Z" />
            <path d="M633 168 748 137 856 174 903 245 811 286 720 258 644 230Z" />
            <path d="M725 296 817 309 880 372 842 435 746 402 689 344Z" />
            <path d="M795 414 877 432 923 489 833 500Z" />
          </g>
          <text className="map-watermark" x="500" y="292">GLOBAL REACH</text>
          <text className="operations-svg-title" x="500" y="56">WORLDWIDE OPERATIONS</text>
          {approved.map((location) => (
            <SvgMarker key={location.name} location={location} />
          ))}
        </svg>
      </div>
      {showCountryGrid ? <CountryFlagGrid /> : null}
    </div>
  );
}

function SvgMarker({ location }: { location: MapLocation }) {
  const label = location.officeLabel || location.name;
  const labelX = location.labelX ?? 18;
  const labelY = location.labelY ?? 0;

  return (
    <g className="map-marker" transform={`translate(${location.x} ${location.y})`} tabIndex={0} role="listitem" aria-label={label}>
      <circle className="marker-pulse" r="17" />
      <circle className="marker-core" r="6" />
      <svg x="-16" y="-30" width="32" height="22" viewBox="0 0 1100 660" preserveAspectRatio="xMidYMin meet">
        <image href={eagleMarker} width="1100" height="1100" preserveAspectRatio="xMidYMin meet" />
      </svg>
      <line className="marker-line" x1="0" y1="0" x2={labelX > 0 ? labelX - 5 : labelX + 5} y2={labelY} />
      <text className="marker-label" x={labelX} y={labelY}>{label}</text>
    </g>
  );
}

function CountryFlagGrid() {
  return (
    <div className="country-flag-grid" aria-label="Approved worldwide operations country list">
      {countryGroups.map((group) => (
        <section key={group.title} className="country-group">
          <h3>{group.title}</h3>
          <div className="country-group-list">
            {group.items.map((item) => (
              <div key={item.name} className="country-flag-card" tabIndex={0}>
                <span className="country-flag" aria-hidden="true">{item.flag}</span>
                <span>
                  <span className="country-name">{item.name}</span>
                  {item.note ? <span className="country-note">{item.note}</span> : null}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ReadableLocationList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="operations-readable-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
