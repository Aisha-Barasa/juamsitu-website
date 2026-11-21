import { useMemo, useState } from 'react';
import { Info, Layers, MapPin, TreePine, Activity, Droplets } from 'lucide-react';
import './DashboardPreview.css';

/**
 * PROMOTIONAL PREVIEW of the JuaMsitu platform.
 * ---------------------------------------------------------------
 * Every number on this component is ILLUSTRATIVE SAMPLE DATA.
 * The NDVI-style layer is generated from a simple formula to look
 * plausible; it is not satellite data. The UI labels this clearly.
 */

// Simplified outline of Kenya as [longitude, latitude] pairs
const KENYA = [
  [34.07, -1.06], [33.95, -0.05], [34.1, 0.35], [34.52, 0.95], [34.8, 1.25],
  [35.0, 1.75], [34.88, 2.45], [34.55, 3.1], [34.4, 3.7], [33.99, 4.22],
  [34.4, 4.6], [35.3, 5.0], [35.82, 4.78], [36.05, 4.45], [36.9, 4.4],
  [38.12, 3.6], [38.9, 3.5], [39.56, 3.42], [40.77, 4.26], [41.17, 3.92],
  [41.86, 3.92], [40.99, 2.78], [40.99, -0.85], [41.56, -1.66], [41.0, -2.05],
  [40.2, -2.75], [40.12, -3.22], [39.8, -3.68], [39.6, -4.05], [39.2, -4.68],
  [37.75, -3.55], [37.6, -3.0],
];

// Map projection: simple equirectangular fit to the SVG viewBox
const SCALE = 48;
const LON0 = 33.7;
const LAT0 = 5.2;
const px = (lon) => (lon - LON0) * SCALE;
const py = (lat) => (LAT0 - lat) * SCALE;

// Forest areas shown on the map, with SAMPLE indicators only
const FORESTS = [
  { id: 'kakamega', name: 'Kakamega Forest', lon: 34.86, lat: 0.27, health: 78, ndvi: 0.71, cover: 'High', trend: [0.66, 0.68, 0.7, 0.72, 0.73, 0.71, 0.69, 0.7, 0.72, 0.74, 0.72, 0.71] },
  { id: 'mau', name: 'Mau Forest Complex', lon: 35.75, lat: -0.55, health: 61, ndvi: 0.58, cover: 'Moderate', trend: [0.62, 0.61, 0.6, 0.6, 0.59, 0.57, 0.56, 0.57, 0.58, 0.59, 0.58, 0.58] },
  { id: 'mtkenya', name: 'Mount Kenya Forest', lon: 37.3, lat: -0.15, health: 74, ndvi: 0.67, cover: 'High', trend: [0.63, 0.64, 0.66, 0.68, 0.69, 0.67, 0.65, 0.66, 0.67, 0.68, 0.67, 0.67] },
  { id: 'aberdare', name: 'Aberdare Range', lon: 36.7, lat: -0.4, health: 70, ndvi: 0.64, cover: 'High', trend: [0.6, 0.61, 0.63, 0.65, 0.66, 0.64, 0.62, 0.63, 0.65, 0.66, 0.65, 0.64] },
  { id: 'elgon', name: 'Mount Elgon', lon: 34.55, lat: 1.1, health: 69, ndvi: 0.63, cover: 'High', trend: [0.58, 0.6, 0.62, 0.64, 0.65, 0.64, 0.62, 0.61, 0.62, 0.64, 0.64, 0.63] },
  { id: 'arabuko', name: 'Arabuko-Sokoke', lon: 39.85, lat: -3.3, health: 57, ndvi: 0.52, cover: 'Moderate', trend: [0.5, 0.49, 0.53, 0.56, 0.55, 0.52, 0.5, 0.49, 0.51, 0.54, 0.53, 0.52] },
];

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

/* ---------- helpers ---------- */

function insidePolygon(lon, lat, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// A plausible-looking vegetation index: drier north and east, greener highlands
function sampleNdvi(lon, lat) {
  let v = 0.5;
  v -= 0.34 * clamp((lat + 0.5) / 4.5);
  v -= 0.26 * clamp((lon - 37.6) / 3);
  v += 0.18 * clamp((35.6 - lon) / 1.6) * (lat < 1.6 ? 1 : 0.3);
  for (const f of FORESTS) {
    const d2 = (lon - f.lon) ** 2 + (lat - f.lat) ** 2;
    v += 0.42 * Math.exp(-d2 / 0.18);
  }
  if (lon > 39.2 && lat < -1.6) v += 0.12;
  v += 0.04 * Math.sin(lon * 12.9898 + lat * 78.233);
  return clamp(v, 0.05, 0.9);
}

function ndviColor(v) {
  if (v < 0.2) return '#B9A57A';
  if (v < 0.32) return '#D3C98A';
  if (v < 0.44) return '#C4D97A';
  if (v < 0.56) return '#9AD94F';
  if (v < 0.68) return '#5FA548';
  return '#2C7A3C';
}

/* ---------- component ---------- */

export default function DashboardPreview() {
  const [selectedId, setSelectedId] = useState('kakamega');
  const [showNdvi, setShowNdvi] = useState(true);
  const selected = FORESTS.find((f) => f.id === selectedId);

  const outline = useMemo(
    () => KENYA.map(([lon, lat], i) => `${i ? 'L' : 'M'}${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`).join(' ') + 'Z',
    []
  );

  // Build the NDVI-style grid once
  const cells = useMemo(() => {
    const step = 0.25;
    const out = [];
    for (let lon = 33.9; lon < 42; lon += step) {
      for (let lat = -4.8; lat < 5.1; lat += step) {
        const cx = lon + step / 2;
        const cy = lat + step / 2;
        if (insidePolygon(cx, cy, KENYA)) {
          out.push({ x: px(lon), y: py(lat + step), c: ndviColor(sampleNdvi(cx, cy)) });
        }
      }
    }
    return out;
  }, []);

  const cellSize = 0.25 * SCALE - 1;

  // Sparkline path for the selected forest
  const spark = useMemo(() => {
    const w = 220, h = 56, min = 0.45, max = 0.8;
    const pts = selected.trend.map((v, i) => [
      (i / (selected.trend.length - 1)) * w,
      h - ((v - min) / (max - min)) * h,
    ]);
    return {
      line: pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' '),
      area: `M0 ${h} ` + pts.map((p) => `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ` L${w} ${h}Z`,
      w,
      h,
    };
  }, [selected]);

  const ring = 2 * Math.PI * 34;

  return (
    <div className="dash" aria-label="Illustrative preview of the JuaMsitu platform">
      {/* Window bar */}
      <div className="dash__bar">
        <span className="dash__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="dash__title">JuaMsitu platform preview</span>
        <span className="dash__sample">
          <Info aria-hidden="true" /> Sample data for illustration
        </span>
      </div>

      <div className="dash__body">
        {/* Layers sidebar */}
        <aside className="dash__side">
          <p className="dash__side-label"><Layers aria-hidden="true" /> Map layers</p>
          <label className="dash__toggle">
            <input type="checkbox" checked={showNdvi} onChange={(e) => setShowNdvi(e.target.checked)} />
            <span>Vegetation index (NDVI-style)</span>
          </label>
          <label className="dash__toggle">
            <input type="checkbox" checked readOnly />
            <span>Forest areas</span>
          </label>
          <label className="dash__toggle is-planned">
            <input type="checkbox" disabled />
            <span>Change alerts <em>planned</em></span>
          </label>

          <p className="dash__side-label dash__side-label--spaced"><MapPin aria-hidden="true" /> Forests</p>
          <ul className="dash__forest-list">
            {FORESTS.map((f) => (
              <li key={f.id}>
                <button
                  className={f.id === selectedId ? 'is-active' : ''}
                  onClick={() => setSelectedId(f.id)}
                  aria-pressed={f.id === selectedId}
                >
                  {f.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Map */}
        <div className="dash__map">
          <svg viewBox="0 0 410 490" role="img" aria-label="Map of Kenya with an illustrative vegetation layer and forest locations">
            <defs>
              <clipPath id="kenya-clip"><path d={outline} /></clipPath>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="rgba(230,239,236,0.07)" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="410" height="490" fill="url(#grid)" />
            <path d={outline} fill="#173F43" />

            {showNdvi && (
              <g clipPath="url(#kenya-clip)">
                {cells.map((c, i) => (
                  <rect key={i} x={c.x + 0.5} y={c.y + 0.5} width={cellSize} height={cellSize} fill={c.c} rx="1.5" />
                ))}
              </g>
            )}

            <path d={outline} fill="none" stroke="rgba(246,249,247,0.7)" strokeWidth="1.5" strokeLinejoin="round" />

            {/* Equator reference */}
            <line x1="0" x2="410" y1={py(0)} y2={py(0)} stroke="rgba(255,217,61,0.45)" strokeDasharray="4 5" />
            <text x="404" y={py(0) - 6} textAnchor="end" className="dash__map-label">Equator</text>

            {FORESTS.map((f) => {
              const active = f.id === selectedId;
              return (
                <g
                  key={f.id}
                  className="dash__pin"
                  transform={`translate(${px(f.lon)} ${py(f.lat)})`}
                  onClick={() => setSelectedId(f.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show ${f.name}`}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId(f.id)}
                >
                  {active && <circle r="15" fill="none" stroke="#FFD93D" strokeWidth="1.5" />}
                  <circle r={active ? 7 : 5.5} fill={active ? '#FFD93D' : '#F6F9F7'} stroke="#0D3236" strokeWidth="2" />
                </g>
              );
            })}
          </svg>

          {showNdvi && (
            <div className="dash__legend" aria-hidden="true">
              <span>Low</span>
              <span className="dash__legend-bar" />
              <span>High vegetation</span>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <section className="dash__detail" aria-live="polite">
          <p className="dash__detail-kicker">Selected forest</p>
          <h3 className="dash__detail-name">{selected.name}</h3>

          <div className="dash__health">
            <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
              <circle cx="42" cy="42" r="34" fill="none" stroke="rgba(230,239,236,0.12)" strokeWidth="8" />
              <circle
                cx="42" cy="42" r="34" fill="none" stroke="#9AD94F" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={ring} strokeDashoffset={ring * (1 - selected.health / 100)}
                transform="rotate(-90 42 42)" style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.22,1,.36,1)' }}
              />
              <text x="42" y="48" textAnchor="middle" className="dash__health-num">{selected.health}</text>
            </svg>
            <div>
              <p className="dash__health-label">Forest health indicator</p>
              <p className="dash__health-sub">Conceptual score out of 100</p>
            </div>
          </div>

          <div className="dash__spark">
            <p className="dash__card-label">Vegetation index, last 12 months</p>
            <svg viewBox={`0 0 ${spark.w} ${spark.h + 16}`} aria-hidden="true">
              <path d={spark.area} fill="rgba(154,217,79,0.16)" />
              <path d={spark.line} fill="none" stroke="#9AD94F" strokeWidth="2" strokeLinejoin="round" />
              {MONTHS.map((m, i) => (
                <text key={i} x={(i / 11) * spark.w} y={spark.h + 13} textAnchor="middle" className="dash__axis">{m}</text>
              ))}
            </svg>
          </div>

          <div className="dash__cards">
            <div className="dash__card">
              <Activity aria-hidden="true" />
              <p className="dash__card-label">Mean NDVI</p>
              <p className="dash__card-value">{selected.ndvi.toFixed(2)}</p>
            </div>
            <div className="dash__card">
              <TreePine aria-hidden="true" />
              <p className="dash__card-label">Canopy density</p>
              <p className="dash__card-value">{selected.cover}</p>
            </div>
            <div className="dash__card">
              <Droplets aria-hidden="true" />
              <p className="dash__card-label">Rainfall context</p>
              <p className="dash__card-value dash__card-value--soon">Planned</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
