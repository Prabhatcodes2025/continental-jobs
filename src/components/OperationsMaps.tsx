import Image from "next/image";

const worldwideMarkerPositions: Record<string, [string, string]> = {
  India: ["65%", "55%"],
  Australia: ["80%", "73%"],
  Singapore: ["72%", "62%"],
  Europe: ["48%", "30%"],
  Saudi: ["55%", "48%"],
  Dubai: ["59%", "47%"],
  Spain: ["43%", "36%"],
  Nepal: ["66%", "49%"],
  "Sri Lanka": ["67%", "61%"],
  Philippines: ["79%", "55%"],
  Africa: ["48%", "63%"]
};

export function IndiaOperationsMap({ locations }: { locations: string[] }) {
  return (
    <div className="operations-image-frame" aria-label="Approved Indian operations map">
      <Image
        src="/brand/indian-operations-map.png"
        alt={`Indian operations map: ${locations.join(", ")}`}
        width={900}
        height={900}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function WorldwideOperationsMap({ regions }: { regions: string[] }) {
  return (
    <div className="operations-map worldwide-operations-map" aria-label="Approved worldwide operations map">
      <div className="operations-map-grid" />
      <div className="world-map-watermark">GLOBAL REACH</div>
      <div className="world-map-line world-map-line-one" />
      <div className="world-map-line world-map-line-two" />
      <div className="world-map-line world-map-line-three" />
      {regions.map((region) => {
        const [left, top] = worldwideMarkerPositions[region] || ["50%", "50%"];
        return <MapMarker key={region} label={region} left={left} top={top} />;
      })}
      <div className="operations-map-title">WORLDWIDE OPERATIONS</div>
    </div>
  );
}

function MapMarker({ label, left, top }: { label: string; left: string; top: string }) {
  return (
    <div className="operations-marker" style={{ left, top }}>
      <span className="operations-marker-dot" />
      <span className="operations-marker-label">{label}</span>
    </div>
  );
}
