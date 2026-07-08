/**
 * DTS GROUPE logo mark — faithful vector recreation of the brand logo:
 * orange roof (double ridge line + chimney), a blue key whose bow is a 4-pane window 
 * wrapped by two "cycle" arrows, and scalloped wavy teeth on the key shafts.
 */
export function Logo({
  className = "h-11 w-auto",
  showText = false,
}: {
  className?: string;
  showText?: boolean;
}) {
  const orange = "#e8531f";
  const blue = "#1668b0";

  if (showText) {
    return (
      <svg
        viewBox="0 0 210 155"
        className={className}
        role="img"
        aria-label="DTS GROUPE"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');
              .logo-title-text {
                font-family: 'Montserrat', 'Space Grotesk', system-ui, -apple-system, sans-serif;
                font-weight: 900;
                font-size: 21px;
                fill: #000000;
                letter-spacing: 0.02em;
                text-anchor: middle;
              }
              .logo-slogan-text {
                font-family: 'Montserrat', 'Inter', system-ui, -apple-system, sans-serif;
                font-weight: 500;
                font-size: 7.8px;
                fill: #1a1a1a;
                letter-spacing: 0.12em;
                text-anchor: middle;
              }
            `}
          </style>
        </defs>

        {/* Graphic Mark */}
        <g id="logo-mark">
          {/* Chimney */}
          <path d="M 145,32 L 145,12 L 155,12 L 155,37 Z" fill={orange} />

          {/* Outer Roof */}
          <path d="M 25,52 L 105,12 L 185,52 L 185,60 L 105,20 L 25,60 Z" fill={orange} />

          {/* Inner Roof */}
          <path d="M 25,63 L 105,23 L 185,63 L 185,69 L 135,44 Q 105,30 75,44 L 25,69 Z" fill={orange} />

          {/* Left Key Blade (Orange) */}
          <path d="M 13,75 L 23,69 L 85,69 L 85,81 C 81.1 81, 79.5 87, 77.25 87 C 75 87, 73.4 81, 69.5 81 C 65.6 81, 64 87, 61.75 87 C 59.5 87, 57.9 81, 54 81 C 50.1 81, 48.5 87, 46.25 87 C 44 87, 42.4 81, 38.5 81 C 34.6 81, 33 87, 30.75 87 C 28.5 87, 26.9 81, 23 81 Z" fill={orange} />

          {/* Right Key Blade (Blue) */}
          <path d="M 125,69 L 187,69 L 197,75 L 187,81 C 183.1 81, 181.5 87, 179.25 87 C 177 87, 175.4 81, 171.5 81 C 167.6 81, 166 87, 163.75 87 C 161.5 87, 159.9 81, 156 81 C 152.1 81, 150.5 87, 148.25 87 C 146 87, 144.4 81, 140.5 81 C 136.6 81, 135 87, 132.75 87 C 130.5 87, 128.9 81, 125 81 Z" fill={blue} />
          <rect x="132" y="74" width="48" height="2" rx="1" fill="#ffffff" />

          {/* Top Cycle Arrow (Orange) */}
          <path d="M 85,75 A 20 20 0 0 1 125,75" fill="none" stroke={orange} strokeWidth="6" />
          <polygon points="120,70 129,72 123,80" fill={orange} />

          {/* Bottom Cycle Arrow (Blue) */}
          <path d="M 125,75 A 20 20 0 0 1 85,75" fill="none" stroke={blue} strokeWidth="6" />
          <polygon points="90,80 81,78 87,70" fill={blue} />

          {/* Window Panes (Blue) */}
          <rect x="97" y="67" width="7" height="7" rx="0.5" fill={blue} />
          <rect x="106" y="67" width="7" height="7" rx="0.5" fill={blue} />
          <rect x="97" y="76" width="7" height="7" rx="0.5" fill={blue} />
          <rect x="106" y="76" width="7" height="7" rx="0.5" fill={blue} />
        </g>

        {/* Typography */}
        <text x="105" y="117" className="logo-title-text">DTS GROUPE</text>
        <text x="105" y="137" className="logo-slogan-text">Ensemble, concrétisons vos projets</text>
      </svg>
    );
  }

  // Graphic Mark Only
  return (
    <svg
      viewBox="0 0 210 110"
      className={className}
      role="img"
      aria-label="DTS GROUPE"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chimney */}
      <path d="M 145,32 L 145,12 L 155,12 L 155,37 Z" fill={orange} />

      {/* Outer Roof */}
      <path d="M 25,52 L 105,12 L 185,52 L 185,60 L 105,20 L 25,60 Z" fill={orange} />

      {/* Inner Roof */}
      <path d="M 25,63 L 105,23 L 185,63 L 185,69 L 135,44 Q 105,30 75,44 L 25,69 Z" fill={orange} />

      {/* Left Key Blade (Orange) */}
      <path d="M 13,75 L 23,69 L 85,69 L 85,81 C 81.1 81, 79.5 87, 77.25 87 C 75 87, 73.4 81, 69.5 81 C 65.6 81, 64 87, 61.75 87 C 59.5 87, 57.9 81, 54 81 C 50.1 81, 48.5 87, 46.25 87 C 44 87, 42.4 81, 38.5 81 C 34.6 81, 33 87, 30.75 87 C 28.5 87, 26.9 81, 23 81 Z" fill={orange} />

      {/* Right Key Blade (Blue) */}
      <path d="M 125,69 L 187,69 L 197,75 L 187,81 C 183.1 81, 181.5 87, 179.25 87 C 177 87, 175.4 81, 171.5 81 C 167.6 81, 166 87, 163.75 87 C 161.5 87, 159.9 81, 156 81 C 152.1 81, 150.5 87, 148.25 87 C 146 87, 144.4 81, 140.5 81 C 136.6 81, 135 87, 132.75 87 C 130.5 87, 128.9 81, 125 81 Z" fill={blue} />
      <rect x="132" y="74" width="48" height="2" rx="1" fill="#ffffff" />

      {/* Top Cycle Arrow (Orange) */}
      <path d="M 85,75 A 20 20 0 0 1 125,75" fill="none" stroke={orange} strokeWidth="6" />
      <polygon points="120,70 129,72 123,80" fill={orange} />

      {/* Bottom Cycle Arrow (Blue) */}
      <path d="M 125,75 A 20 20 0 0 1 85,75" fill="none" stroke={blue} strokeWidth="6" />
      <polygon points="90,80 81,78 87,70" fill={blue} />

      {/* Window Panes (Blue) */}
      <rect x="97" y="67" width="7" height="7" rx="0.5" fill={blue} />
      <rect x="106" y="67" width="7" height="7" rx="0.5" fill={blue} />
      <rect x="97" y="76" width="7" height="7" rx="0.5" fill={blue} />
      <rect x="106" y="76" width="7" height="7" rx="0.5" fill={blue} />
    </svg>
  );
}
