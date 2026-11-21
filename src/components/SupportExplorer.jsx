import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInViewOnce, useMediaQuery, usePrefersReducedMotion } from '../hooks/motion.js';
import { site } from '../config/site.js';

/**
 * "How JuaMsitu supports organisations"
 * ---------------------------------------------------------------
 * Desktop: vertical tab list (left) + one detail panel (right).
 * Mobile (≤760px): an accordion, one area open at a time.
 *
 * - All six panels are rendered into the DOM (inactive ones are `hidden`),
 *   so every area's copy is part of the page, not fetched by script.
 * - Tabs follow the WAI-ARIA pattern: role=tablist/tab/tabpanel,
 *   aria-selected, aria-controls, roving tabindex; Arrow Up/Down,
 *   Home and End move between tabs.
 * - Motion uses transform and opacity only, and switches instantly when
 *   the visitor prefers reduced motion.
 *
 * Copy note: questions marked DRAFT were written by Claude and need review.
 */

const areas = [
  {
    id: 'monitoring',
    label: 'Environmental monitoring',
    title: 'Keep watch on the landscapes you are responsible for.',
    text: 'Support consistent monitoring of forest landscapes and environmental conditions, so that changes are noticed as they happen rather than discovered long after.',
    question: 'Is the forest around our operations stable, or changing?', // your example
  },
  {
    id: 'geospatial',
    label: 'Geospatial insights',
    title: 'See conditions in their place.',
    text: 'Use spatial information to understand environmental conditions and changes across different locations, rather than relying on a single number for a whole area.',
    question: 'Where exactly are conditions different, and why?', // DRAFT
  },
  {
    id: 'health',
    label: 'Forest health visibility',
    title: 'Make forest condition visible.',
    text: 'NDVI-based vegetation indicators are designed to give a consistent view of how green and vigorous a canopy is, compared with its own seasonal pattern.',
    question: 'How healthy is the vegetation across the sites we support?', // DRAFT
  },
  {
    id: 'change',
    label: 'Understanding ecosystem change',
    title: 'Tell seasonal change from lasting change.',
    text: 'Bring environmental information into context over time, to understand whether a forest is following its usual cycle, degrading, or recovering.',
    question: 'Is this a dry season, or a decline?', // DRAFT
  },
  {
    id: 'decisions',
    label: 'Environmental decision-making',
    title: 'Ground decisions in evidence.',
    text: 'Translate environmental observations into insight that can inform conservation planning, restoration priorities and environmental management.',
    question: 'Where should restoration effort go first?', // DRAFT
  },
  {
    id: 'reporting',
    label: 'Sustainability and reporting support',
    title: 'Support transparent reporting.',
    text: 'Provide relevant environmental insights that can contribute to sustainability disclosures, monitoring frameworks and evidence-based reporting.',
    question: 'What can we credibly say about our environmental context?', // DRAFT
  },
];

const num = (i) => String(i + 1).padStart(2, '0');
const OUT_MS = 120; // old content fades out, then the new content staggers in

/** Panel content shared by the desktop panel and the mobile accordion. */
function AreaDetail({ area, index, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <>
      <span className="sx-num" aria-hidden="true">{num(index)}</span>
      <Heading className="sx-title sx-step" style={{ '--i': 0 }}>{area.title}</Heading>
      <p className="sx-text sx-step" style={{ '--i': 1 }}>{area.text}</p>
      <hr className="sx-rule sx-step" style={{ '--i': 2 }} />
      <p className="sx-question sx-step" style={{ '--i': 3 }}>
        <span className="sx-question__label">The question it helps answer</span>
        <span className="sx-question__text">{area.question}</span>
      </p>
      <a
        className="sx-link sx-step"
        style={{ '--i': 4 }}
        href={site.bookingUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Talk to us about ${area.label.toLowerCase()} (opens the booking page in a new tab)`}
      >
        Talk to us about this
      </a>
    </>
  );
}

/* ------------------------------ Desktop tabs ------------------------------ */

function Tabs({ inView }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);      // selected tab
  const [shown, setShown] = useState(0);        // panel currently displayed
  const [phase, setPhase] = useState('idle');   // 'idle' | 'out' | 'in'
  const tabsRef = useRef([]);
  const listRef = useRef(null);
  const [bar, setBar] = useState({ y: 0, h: 0 });

  // Position the lime bar on the selected tab (it slides via translateY)
  const measure = useCallback(() => {
    const el = tabsRef.current[active];
    if (el) setBar({ y: el.offsetTop, h: el.offsetHeight });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Swap the panel: fade the old content out, then stagger the new one in
  useEffect(() => {
    if (active === shown) return undefined;
    if (reduced) {
      setShown(active);
      setPhase('idle');
      return undefined;
    }
    setPhase('out');
    const t = setTimeout(() => {
      setShown(active);
      setPhase('in');
    }, OUT_MS);
    return () => clearTimeout(t);
  }, [active, shown, reduced]);

  const select = (i, focus = false) => {
    setActive(i);
    if (focus) tabsRef.current[i]?.focus();
  };

  const onKeyDown = (e) => {
    const last = areas.length - 1;
    if (e.key === 'ArrowDown') { e.preventDefault(); select(active === last ? 0 : active + 1, true); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); select(active === 0 ? last : active - 1, true); }
    else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    else if (e.key === 'End') { e.preventDefault(); select(last, true); }
  };

  return (
    <div className={`sx ${inView ? 'is-in' : ''}`}>
      <div
        className="sx-tabs"
        role="tablist"
        aria-label="How JuaMsitu supports organisations"
        aria-orientation="vertical"
        ref={listRef}
        onKeyDown={onKeyDown}
      >
        <span
          className="sx-bar"
          aria-hidden="true"
          style={{ height: bar.h, transform: `translateY(${bar.y}px)` }}
        />
        {areas.map((a, i) => (
          <button
            key={a.id}
            ref={(el) => (tabsRef.current[i] = el)}
            type="button"
            role="tab"
            id={`sx-tab-${a.id}`}
            aria-selected={i === active}
            aria-controls={`sx-panel-${a.id}`}
            tabIndex={i === active ? 0 : -1}
            className={`sx-tab ${i === active ? 'is-active' : ''}`}
            style={{ '--d': `${i * 70}ms` }}
            onClick={() => select(i)}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="sx-stage">
        <div className="sx-dots" aria-hidden="true" />
        {areas.map((a, i) => (
          <div
            key={a.id}
            role="tabpanel"
            id={`sx-panel-${a.id}`}
            aria-labelledby={`sx-tab-${a.id}`}
            aria-live="polite"
            tabIndex={0}
            hidden={i !== shown}
            className={`sx-panel ${i === shown ? `is-${phase}` : ''}`}
          >
            <AreaDetail area={a} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Mobile accordion ---------------------------- */

function Accordion({ inView }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={`sx-acc ${inView ? 'is-in' : ''}`}>
      {areas.map((a, i) => {
        const isOpen = open === i;
        return (
          <div className={`sx-acc__item ${isOpen ? 'is-open' : ''}`} key={a.id} style={{ '--d': `${i * 70}ms` }}>
            <h3 className="sx-acc__heading">
              <button
                type="button"
                className="sx-acc__trigger"
                aria-expanded={isOpen}
                aria-controls={`sx-acc-${a.id}`}
                id={`sx-acc-btn-${a.id}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{a.label}</span>
                <span className="sx-acc__chev" aria-hidden="true" />
              </button>
            </h3>
            {/* grid-template-rows 0fr -> 1fr gives a smooth height transition */}
            <div
              className="sx-acc__region"
              id={`sx-acc-${a.id}`}
              role="region"
              aria-labelledby={`sx-acc-btn-${a.id}`}
              inert={isOpen ? undefined : ''}
            >
              <div className="sx-acc__inner">
                <div className="sx-acc__content">
                  <AreaDetail area={a} index={i} headingLevel={4} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SupportExplorer() {
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [ref, inView] = useInViewOnce(0.2);
  return <div ref={ref}>{isMobile ? <Accordion inView={inView} /> : <Tabs inView={inView} />}</div>;
}
