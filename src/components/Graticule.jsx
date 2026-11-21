/**
 * Survey-grid overlay: faint graticule lines with small markers where
 * they cross. It is JuaMsitu's visual signature, linking forest imagery
 * with geospatial measurement. Decorative, hidden from screen readers.
 */
export default function Graticule({ dense = false }) {
  const cols = dense ? 6 : 8;
  const rows = dense ? 6 : 5;
  const xs = Array.from({ length: cols - 1 }, (_, i) => ((i + 1) / cols) * 100);
  const ys = Array.from({ length: rows - 1 }, (_, i) => ((i + 1) / rows) * 100);

  return (
    <svg className={`graticule ${dense ? 'graticule--dense' : ''}`} aria-hidden="true">
      {xs.map((x) => (
        <line key={`x${x}`} x1={`${x}%`} x2={`${x}%`} y1="0" y2="100%" />
      ))}
      {ys.map((y) => (
        <line key={`y${y}`} y1={`${y}%`} y2={`${y}%`} x1="0" x2="100%" />
      ))}
      {xs.flatMap((x) =>
        ys.map((y) => <circle key={`c${x}-${y}`} cx={`${x}%`} cy={`${y}%`} r="2" />)
      )}
    </svg>
  );
}
