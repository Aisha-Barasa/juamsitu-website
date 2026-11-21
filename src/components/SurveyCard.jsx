import SmartImage from './SmartImage.jsx';

/**
 * Rounded aerial image card with a "survey" overlay.
 * ---------------------------------------------------------------
 * When `inView` becomes true (the parent passes it from useInViewOnce):
 *   1. the photo fades in and settles from scale 1.06 to 1
 *   2. grid lines draw in
 *   3. yellow dots pop in from top-left to bottom-right, then pulse softly
 *   4. viewfinder brackets close in on all four corners
 *   5. a faint scan line sweeps down once, then every ~10 s
 *   6. the caption fades in last over a soft bottom gradient
 * Everything is CSS (transform and opacity only); with reduced motion the
 * final state shows immediately. Purely decorative layers are aria-hidden.
 */

const COLS = 6;
const ROWS = 6;
const xs = Array.from({ length: COLS - 1 }, (_, i) => ((i + 1) / COLS) * 100);
const ys = Array.from({ length: ROWS - 1 }, (_, i) => ((i + 1) / ROWS) * 100);

export default function SurveyCard({ image, caption, inView, width = 1600, height = 2000 }) {
  return (
    <figure className={`survey-frame survey-card ${inView ? 'is-in' : ''}`}>
      <div className="survey-card__media">
        <SmartImage
          src={image.src}
          alt={image.alt}
          className="survey-frame__img"
          width={width}
          height={height}
        />
      </div>

      {/* Grid lines and data points */}
      <div className="survey-card__grid" aria-hidden="true">
        {xs.map((x, i) => (
          <span key={`v${i}`} className="sg-line sg-line--v" style={{ left: `${x}%`, '--d': `${200 + i * 60}ms` }} />
        ))}
        {ys.map((y, i) => (
          <span key={`h${i}`} className="sg-line sg-line--h" style={{ top: `${y}%`, '--d': `${200 + i * 60}ms` }} />
        ))}
        {ys.map((y, r) =>
          xs.map((x, c) => (
            <span
              key={`d${r}-${c}`}
              className="sg-dot"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                // Diagonal sequence: top-left first, bottom-right last
                '--d': `${700 + (r + c) * 55}ms`,
                // Idle pulses start after the pop, slightly out of step
                '--p': `${1500 + ((r * 7 + c * 3) % 9) * 260}ms`,
              }}
            >
              <i />
            </span>
          ))
        )}
      </div>

      {/* Scan line */}
      <div className="survey-card__scan" aria-hidden="true"><span /></div>

      {/* Viewfinder brackets */}
      <span className="vf vf--tl" aria-hidden="true" />
      <span className="vf vf--tr" aria-hidden="true" />
      <span className="vf vf--bl" aria-hidden="true" />
      <span className="vf vf--br" aria-hidden="true" />

      {/* Caption over a soft gradient */}
      <div className="survey-card__shade" aria-hidden="true" />
      <figcaption className="survey-frame__caption survey-card__caption">{caption}</figcaption>
    </figure>
  );
}
