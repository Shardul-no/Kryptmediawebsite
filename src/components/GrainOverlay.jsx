import { useId } from 'react';

/**
 * Reusable SVG grain/noise texture overlay.
 * Place as first child inside a `relative` container.
 */
export default function GrainOverlay({ opacity = 0.045, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const id = `grain-${uid}`;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  );
}
