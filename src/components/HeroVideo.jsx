import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Pause, Play } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import { usePrefersReducedMotion } from '../hooks/motion.js';

/**
 * Hero background: the forest photo, with a looping video layered on top.
 * ---------------------------------------------------------------------
 * - The photo renders immediately (it is the first paint and the poster),
 *   so the video never blocks the page or flashes empty.
 * - The video is only attached after mount, and only when appropriate:
 *     reduced motion           -> photo only, nothing autoplays
 *     Save-Data / 2G           -> photo only
 *     screen under 768px       -> 720p files
 *     otherwise                -> 1080p files
 * - If the video files are missing or fail, the photo simply stays.
 * - Near the end of each loop the video fades out to the photo and fades
 *   back in as it restarts, so the loop reads as a crossfade.
 * - A small pause/play button controls the video and the hero's slow zoom
 *   and grid drift (via onPausedChange). It is rendered into `controlsEl`,
 *   a container above the overlay, so it is never hidden behind it.
 */

const FADE_WINDOW = 0.7; // seconds before the end where the crossfade starts

function pickMode(reducedMotion) {
  if (reducedMotion) return 'poster';
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn && (conn.saveData || ['slow-2g', '2g'].includes(conn.effectiveType))) return 'poster';
  return window.innerWidth < 768 ? 'sd' : 'hd';
}

export default function HeroVideo({ poster, alt, sources, onPausedChange, controlsEl }) {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef(null);
  const [mode, setMode] = useState('poster'); // decided after first paint
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  // Decide after mount, so the photo paints first
  useEffect(() => {
    setMode(pickMode(reducedMotion));
  }, [reducedMotion]);

  // React does not reliably set the `muted` attribute, which autoplay requires
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {
      // Autoplay refused (e.g. low-power mode): keep the photo, offer play
      setPaused(true);
    });
  }, [mode]);

  useEffect(() => {
    onPausedChange?.(paused);
  }, [paused, onPausedChange]);

  const onTimeUpdate = (e) => {
    const v = e.currentTarget;
    if (!v.duration) return;
    if (v.currentTime > v.duration - FADE_WINDOW) setFading(true);
    else if (v.currentTime < FADE_WINDOW && fading) setFading(false);
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const files = sources?.[mode];
  const showVideo = mode !== 'poster' && files && !failed;

  return (
    <>
      <div className="hero-video">
        {/* Poster / still image: always present underneath */}
        <SmartImage src={poster} alt={alt} className="hero-video__poster" eager />

        {showVideo && (
          <video
            ref={videoRef}
            className={`hero-video__media ${playing ? 'is-playing' : ''} ${fading ? 'is-fading' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            onTimeUpdate={onTimeUpdate}
            onError={() => setFailed(true)}
          >
            <source src={files.webm} type="video/webm" />
            {/* The error event fires on the last <source> when none can be played */}
            <source src={files.mp4} type="video/mp4" onError={() => setFailed(true)} />
          </video>
        )}
      </div>

      {showVideo && playing && controlsEl && createPortal(
        <button
          type="button"
          className="hero-video__toggle"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>,
        controlsEl
      )}
    </>
  );
}
