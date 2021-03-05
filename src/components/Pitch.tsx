const Pitch: React.FC<Props> = ({
  colour = "#315908",
  strokeColor = "#ffffff",
  pattern = "Stripes"
}) => (
  <svg viewBox="0 0 320 200" width="100%" height="100%">
    <defs>
      <pattern id="Stripes" x="0" y="0" width="100%" height="30" patternUnits="userSpaceOnUse">
        <rect fill="white" opacity="0.075" x="0" width="100%" height="15" y="0"/>
        <rect fill="white" opacity="0" x="0" width="100%" height="15" y="30"/>
      </pattern>
      <pattern id="Checked" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect fill="white" opacity="0.1" x="0" width="10" height="10" y="0"/>
        <rect fill="white" opacity="0.1" x="10" width="10" height="10" y="10"/>
      </pattern>
      <pattern id="Slope" x="0" y="0" width="100%" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45 2 2)">
        <g>
          <rect fill="white" opacity="0.1" x="0" width="100%" height="100%" y="0"/>
          <rect fill="white" opacity="0.1" x="0" width="100%" height="100%" y="10"/>
        </g>
      </pattern>
      <pattern id="Grid" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
        <g fill="white" stroke="white" strokeWidth="10">
          <line x1="10" y1="0" x2="10" y2="20" stroke="white" opacity="0.05"/>
          <line x1="0" y1="10" x2="20" y2="10" stroke="white" opacity="0.05"/>
        </g>
      </pattern>
    </defs>
    <g strokeWidth="1" stroke={strokeColor} fill="none">
    <rect x="0" y="0" width="320" height="200" stroke="none" fill={colour}/>
      <rect x="0" y="0" width="320" height="200" stroke="none" fill={`url(#${pattern})`}/>
      <g opacity="0.5">
        <path d="M 10 10 L310 10 L310 190 L10 190 L10 10"/>
        <path d="M 160 10 L160 190"/>
        <circle cx="160" cy="100" r="30"/>
        <circle cx="160" cy="100" r="2" fill="white"/>

        <path  d="M11 50 H60 V150 H11"/>
        <path  d="M11 65 H30 V135 H11"/>
        <path d="M 61 80 A 181 60 0 0 1 61 120"/>

        <path  d="M309 50 H260 V150 H309"/>
        <path  d="M309 65 H290 V135 H309"/>
        <path d="M 259 80 A 181 60 0 0 0 259 120"/>
      </g>
    </g>
</svg>
);


type Props = {
  strokeColor?: string,
  colour?: string,
  pattern?: string
};

export default Pitch;
