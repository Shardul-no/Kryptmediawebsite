import { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

export default function Aurora({
  colorStops = ['#ED921D', '#F2A966', '#EBCB9F'],
  blend = 0.4,
  amplitude = 0.8,
  speed = 0.2,
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const colors = colorStops.map(hexToRgb);
    let t = 0;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      colors.forEach((rgb, idx) => {
        const freq = 2 * Math.PI / width;
        const phase = t + (idx * Math.PI * 2) / colors.length;
        const yBase = height * (0.25 + idx * (0.5 / (colors.length - 1 || 1)));
        const amp = height * 0.18 * amplitude;

        const grad = ctx.createLinearGradient(0, yBase - amp, 0, yBase + amp * 2);
        grad.addColorStop(0,   `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
        grad.addColorStop(0.4, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${blend * 0.25})`);
        grad.addColorStop(0.6, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${blend * 0.15})`);
        grad.addColorStop(1,   `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);

        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 2) {
          const noise1 = Math.sin(freq * x * 1.5 + phase) * amp;
          const noise2 = Math.sin(freq * x * 0.8 + phase * 1.3) * amp * 0.5;
          ctx.lineTo(x, yBase + noise1 + noise2);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();
      });

      t += 0.003 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
