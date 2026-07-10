const indiaMarkerPositions: Record<string, [string, string]> = {
  Cochin: ["34%", "78%"],
  Madurai: ["43%", "78%"],
  Bombay: ["28%", "57%"],
  Gujarat: ["21%", "45%"],
  Jaipur: ["36%", "34%"],
  Delhi: ["43%", "26%"],
  Kolkata: ["69%", "46%"],
  Siliguri: ["65%", "34%"],
  Vizag: ["62%", "62%"]
};

const worldwideMarkerPositions: Record<string, [string, string]> = {
  India: ["65%", "55%"],
  Australia: ["80%", "73%"],
  Singapore: ["72%", "62%"],
  Europe: ["48%", "30%"],
  Saudi: ["55%", "48%"],
  Dubai: ["59%", "47%"],
  Philippines: ["79%", "55%"],
  Nepal: ["66%", "49%"]
};

export function IndiaOperationsMap({ locations }: { locations: string[] }) {
  return (
    <div className="operations-map india-operations-map" aria-label="Approved Indian operations map">
      <div className="operations-map-grid" />
      <div className="india-map-shape">
        <span className="india-map-label">INDIA</span>
      </div>
      {locations.map((location) => {
        const [left, top] = indiaMarkerPositions[location] || ["50%", "50%"];
        return <MapMarker key={location} label={location} left={left} top={top} />;
      })}
      <div className="operations-map-title">INDIAN OPERATIONS</div>
    </div>
  );
}

export function WorldwideOperationsMap({ regions }: { regions: string[] }) {
  return (
    <div className="operations-map worldwide-operations-map" aria-label="Approved worldwide operations map">
      <div className="operations-map-grid" />
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
