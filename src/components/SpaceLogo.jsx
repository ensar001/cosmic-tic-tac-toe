export default function SpaceLogo() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="space-logo"
    >
      <defs>
        <linearGradient id="planetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="50%" stopColor="#764ba2" />
          <stop offset="100%" stopColor="#f093fb" />
        </linearGradient>
        
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>

        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#667eea" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#667eea" stopOpacity="0" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="45" fill="url(#glowGradient)" className="logo-glow" />

      {/* Planet body */}
      <circle cx="50" cy="50" r="30" fill="url(#planetGradient)" filter="url(#glow)" className="planet" />

      {/* Craters */}
      <circle cx="42" cy="45" r="4" fill="#5a67d8" opacity="0.4" />
      <circle cx="58" cy="52" r="3" fill="#5a67d8" opacity="0.3" />
      <circle cx="50" cy="60" r="2.5" fill="#5a67d8" opacity="0.35" />

      {/* Tic-tac-toe grid overlay */}
      <g className="grid-overlay" stroke="#fff" strokeWidth="1.5" opacity="0.6">
        <line x1="40" y1="35" x2="40" y2="65" />
        <line x1="60" y1="35" x2="60" y2="65" />
        <line x1="35" y1="45" x2="65" y2="45" />
        <line x1="35" y1="55" x2="65" y2="55" />
      </g>

      {/* X and O symbols */}
      <g className="symbols" stroke="#00f2fe" strokeWidth="2" fill="none" filter="url(#glow)">
        {/* X */}
        <line x1="37" y1="38" x2="43" y2="44" strokeLinecap="round" />
        <line x1="43" y1="38" x2="37" y2="44" strokeLinecap="round" />
        
        {/* O */}
        <circle cx="57" cy="60" r="4" />
      </g>

      {/* Orbiting ring */}
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="12"
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth="2"
        opacity="0.7"
        className="orbit-ring"
        filter="url(#glow)"
      />

      {/* Stars */}
      <g className="stars" fill="#fff">
        <circle cx="15" cy="20" r="1" className="star star-1" />
        <circle cx="85" cy="25" r="1.5" className="star star-2" />
        <circle cx="20" cy="80" r="1" className="star star-3" />
        <circle cx="80" cy="75" r="1.2" className="star star-4" />
        <circle cx="90" cy="50" r="0.8" className="star star-5" />
      </g>
    </svg>
  );
}
