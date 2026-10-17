import React from 'react';

interface DhruvaBitmojiProps {
  className?: string;
  isWaving?: boolean;
}

export const DhruvaBitmoji: React.FC<DhruvaBitmojiProps> = ({
  className = 'w-52 h-52 sm:w-60 sm:h-60',
  isWaving = true
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin Gradients - Realistic Warm South Asian Tone matching Dhruva's photo */}
          <linearGradient id="dhruvaSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D49F7B" />
            <stop offset="65%" stopColor="#C48D67" />
            <stop offset="100%" stopColor="#AD7550" />
          </linearGradient>

          <linearGradient id="dhruvaSkinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9C6442" />
            <stop offset="100%" stopColor="#7F4D2F" />
          </linearGradient>

          {/* Hair Gradient with Volume & Soft Depth */}
          <linearGradient id="dhruvaHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A2930" />
            <stop offset="40%" stopColor="#1C1B20" />
            <stop offset="100%" stopColor="#100F13" />
          </linearGradient>

          {/* Sweatshirt Gradient - Cream / Off-White Crewneck */}
          <linearGradient id="dhruvaSweatshirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5F1E8" />
            <stop offset="50%" stopColor="#E6E0D3" />
            <stop offset="100%" stopColor="#CCC5B5" />
          </linearGradient>

          {/* Glass Glare */}
          <linearGradient id="lensGlare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
          </linearGradient>

          {/* Filter for Ambient Soft Shadow */}
          <filter id="avatarShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* --- BODY & CLOTHING --- */}
        <g id="body" filter="url(#avatarShadow)">
          {/* Shoulders - Raglan Sweatshirt */}
          <path
            d="M52 230 C54 195 82 178 130 178 C178 178 206 195 208 230 L208 245 L52 245 Z"
            fill="url(#dhruvaSweatshirt)"
            stroke="#B8B0A0"
            strokeWidth="2"
          />

          {/* Raglan Sleeve Seams (matching his sweatshirt in photo) */}
          <path
            d="M82 186 C72 202 62 218 56 230"
            fill="none"
            stroke="#C4BCAD"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M178 186 C188 202 198 218 204 230"
            fill="none"
            stroke="#C4BCAD"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Sweatshirt Crewneck Ribbed Collar */}
          <path
            d="M104 180 C114 196 146 196 156 180"
            fill="none"
            stroke="#B5AD9C"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M106 184 C116 198 144 198 154 184"
            fill="none"
            stroke="#DCD5C6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* --- NECK --- */}
        <g id="neck">
          {/* Base Neck */}
          <path
            d="M115 150 L115 184 C122 187 138 187 145 184 L145 150 Z"
            fill="url(#dhruvaSkin)"
          />
          {/* Under-chin shadow */}
          <path
            d="M115 150 C125 162 135 162 145 150 L145 158 C135 168 125 168 115 158 Z"
            fill="url(#dhruvaSkinShadow)"
            opacity="0.65"
          />
        </g>

        {/* --- HEAD & EARS --- */}
        <g id="head">
          {/* Left Ear */}
          <g id="left-ear">
            <ellipse cx="76" cy="120" rx="9" ry="14" fill="#C48D67" stroke="#A66F48" strokeWidth="1.5" />
            <path d="M75 113 C72 118 72 125 76 127" fill="none" stroke="#9C6442" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right Ear */}
          <g id="right-ear">
            <ellipse cx="184" cy="120" rx="9" ry="14" fill="#C48D67" stroke="#A66F48" strokeWidth="1.5" />
            <path d="M185 113 C188 118 188 125 184 127" fill="none" stroke="#9C6442" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Main Face Contour (Strong jawline, friendly chin) */}
          <path
            d="M82 108 C80 68 180 68 178 108 C178 138 168 162 130 162 C92 162 82 138 82 108 Z"
            fill="url(#dhruvaSkin)"
            stroke="#A66F48"
            strokeWidth="1.5"
          />

          {/* Warm Friendly Cheek Flush */}
          <ellipse cx="98" cy="132" rx="9" ry="5" fill="#E27B7B" fillOpacity="0.22" />
          <ellipse cx="162" cy="132" rx="9" ry="5" fill="#E27B7B" fillOpacity="0.22" />

          {/* --- FACIAL HAIR (Dhruva's light neat mustache & chin goatee) --- */}
          {/* Mustache */}
          <path
            d="M115 137 C122 133 128 136 130 137 C132 136 138 133 145 137 C141 140 134 140 130 139 C126 140 119 140 115 137 Z"
            fill="#1E1D22"
            opacity="0.9"
          />
          {/* Chin beard / goatee shadow */}
          <ellipse cx="130" cy="154" rx="7" ry="3.5" fill="#1E1D22" opacity="0.35" />
          <path d="M126 148 C128 150 132 150 134 148" fill="none" stroke="#1E1D22" strokeWidth="1.5" opacity="0.4" />

          {/* --- NOSE --- */}
          <path
            d="M128 115 L127 127 C127 130 133 130 133 127"
            fill="none"
            stroke="#9C6442"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="123" cy="127" rx="1.5" ry="1" fill="#8D5735" />
          <ellipse cx="137" cy="127" rx="1.5" ry="1" fill="#8D5735" />

          {/* --- BIG SIGNATURE SMILE --- */}
          <g id="smile">
            {/* Open Mouth Interior */}
            <path
              d="M111 138 Q130 162 149 138 C144 140 116 140 111 138 Z"
              fill="#6B1D24"
            />
            {/* Bright Upper Teeth */}
            <path
              d="M114 139 Q130 148 146 139 C143 143 117 143 114 139 Z"
              fill="#FFFFFF"
            />
            {/* Tongue Depth */}
            <path
              d="M121 154 Q130 151 139 154 Q130 159 121 154 Z"
              fill="#D9636C"
            />
            {/* Lip Line definition */}
            <path
              d="M109 137 Q130 141 151 137"
              fill="none"
              stroke="#A66F48"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M111 138 Q130 163 149 138"
              fill="none"
              stroke="#8D5735"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* --- EYES & EYEBROWS --- */}
          {/* Left Eyebrow (Arch matching photo) */}
          <path
            d="M90 95 C98 88 110 90 115 97"
            fill="none"
            stroke="#19181D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right Eyebrow */}
          <path
            d="M170 95 C162 88 150 90 145 97"
            fill="none"
            stroke="#19181D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Eye */}
          <ellipse cx="103" cy="110" rx="6" ry="6.5" fill="#1A191E" />
          <ellipse cx="103" cy="110" rx="3" ry="3.5" fill="#422517" />
          <circle cx="105" cy="108" r="2" fill="#FFFFFF" />
          <circle cx="101" cy="112" r="1" fill="#FFFFFF" opacity="0.8" />

          {/* Right Eye */}
          <ellipse cx="157" cy="110" rx="6" ry="6.5" fill="#1A191E" />
          <ellipse cx="157" cy="110" rx="3" ry="3.5" fill="#422517" />
          <circle cx="159" cy="108" r="2" fill="#FFFFFF" />
          <circle cx="155" cy="112" r="1" fill="#FFFFFF" opacity="0.8" />

          {/* --- SIGNATURE ROUND WIREFRAME GLASSES --- */}
          <g id="glasses" filter="url(#avatarShadow)">
            {/* Left Glass Lens */}
            <circle
              cx="103"
              cy="111"
              r="19"
              fill="url(#lensGlare)"
              stroke="#111115"
              strokeWidth="3.2"
            />
            {/* Right Glass Lens */}
            <circle
              cx="157"
              cy="111"
              r="19"
              fill="url(#lensGlare)"
              stroke="#111115"
              strokeWidth="3.2"
            />
            {/* Keyhole Curved Bridge */}
            <path
              d="M122 108 C126 103 134 103 138 108"
              fill="none"
              stroke="#111115"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Left Temple Bar */}
            <path
              d="M84 110 L74 113"
              fill="none"
              stroke="#111115"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Right Temple Bar */}
            <path
              d="M176 110 L186 113"
              fill="none"
              stroke="#111115"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Realistic Glass Lens Glare Sheen Lines */}
            <path
              d="M93 99 Q103 96 109 98"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M147 99 Q157 96 163 98"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>
        </g>

        {/* --- DHRUVA'S VOLUMINOUS WAVY HAIR --- */}
        <g id="hair" filter="url(#avatarShadow)">
          {/* Main Hair Silhouette with textured waves on top */}
          <path
            d="M74 105 C70 65 90 40 130 38 C170 40 190 65 186 105 C190 90 185 64 165 52 C154 45 138 42 128 42 C115 42 100 45 88 54 C75 66 72 88 74 105 Z"
            fill="url(#dhruvaHair)"
          />

          {/* Textured Volume Curls on Top (matching his curly wave style) */}
          <path
            d="M92 56 C85 45 98 34 112 36 C124 28 142 30 152 38 C164 34 178 46 172 58 C182 65 184 78 182 90 C176 80 172 74 162 70 C154 58 136 52 124 54 C112 52 98 58 92 68 C84 72 78 78 76 86 C74 74 78 62 92 56 Z"
            fill="#1F1E24"
          />

          {/* Wave Tufts & Highlights */}
          <path
            d="M96 68 C104 62 112 68 120 64 C128 60 136 66 146 62 C154 60 162 66 168 70"
            fill="none"
            stroke="#34323D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M108 50 C118 44 132 44 142 48"
            fill="none"
            stroke="#4A4754"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M120 36 C126 32 136 32 142 36"
            fill="none"
            stroke="#4A4754"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Sideburns */}
          <path
            d="M78 102 L76 118 L82 116 L84 104 Z"
            fill="#1A191F"
          />
          <path
            d="M182 102 L184 118 L178 116 L176 104 Z"
            fill="#1A191F"
          />
        </g>

        {/* --- ANIMATED WAVING HAND & ARM (👋) --- */}
        <g
          id="waving-hand"
          className={isWaving ? 'origin-[198px_195px] animate-[wave_1.4s_ease-in-out_infinite]' : ''}
        >
          {/* Forearm & Sleeve */}
          <path
            d="M188 205 C198 178 214 154 220 138 L235 147 C226 170 210 198 196 220 Z"
            fill="url(#dhruvaSweatshirt)"
            stroke="#B8B0A0"
            strokeWidth="2"
          />
          {/* Hand Palm */}
          <ellipse
            cx="226"
            cy="126"
            rx="13"
            ry="12"
            fill="#C48D67"
            stroke="#A66F48"
            strokeWidth="1.8"
          />
          {/* Thumb */}
          <path
            d="M213 129 Q206 118 211 112 Q217 108 221 118 Z"
            fill="#C48D67"
            stroke="#A66F48"
            strokeWidth="1.8"
          />
          {/* Fingers waving */}
          <rect x="218" y="104" width="6" height="17" rx="3" fill="#D49F7B" stroke="#A66F48" strokeWidth="1.8" />
          <rect x="225.5" y="100" width="6" height="19" rx="3" fill="#D49F7B" stroke="#A66F48" strokeWidth="1.8" />
          <rect x="233" y="103" width="6" height="17" rx="3" fill="#D49F7B" stroke="#A66F48" strokeWidth="1.8" />
          <rect x="240.5" y="110" width="5.5" height="13" rx="2.5" fill="#D49F7B" stroke="#A66F48" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
};
