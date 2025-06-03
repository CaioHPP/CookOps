import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 200, height = 60 }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Chef's Hat */}
        <g transform="translate(10, 8)">
          <path
            d="M20 35 L30 35 C32 35 34 33 34 31 L34 20 C34 18 32 16 30 16 L28 16 C28 14 26 12 24 12 C22 12 20 14 20 16 L18 16 C16 16 14 18 14 20 L14 31 C14 33 16 35 18 35 L20 35 Z"
            fill="#ffffff"
            stroke="#ff6b35"
            strokeWidth="2"
          />
          {/* Hat lines */}
          <line
            x1="16"
            y1="22"
            x2="32"
            y2="22"
            stroke="#ff6b35"
            strokeWidth="1"
          />
          <line
            x1="16"
            y1="26"
            x2="32"
            y2="26"
            stroke="#ff6b35"
            strokeWidth="1"
          />
          <line
            x1="16"
            y1="30"
            x2="32"
            y2="30"
            stroke="#ff6b35"
            strokeWidth="1"
          />
        </g>

        {/* Cooking Pan */}
        <g transform="translate(40, 20)">
          <ellipse
            cx="15"
            cy="15"
            rx="12"
            ry="8"
            fill="#4a5568"
            stroke="#2d3748"
            strokeWidth="2"
          />
          <rect x="25" y="13" width="8" height="4" rx="2" fill="#4a5568" />
          {/* Steam lines */}
          <path
            d="M8 8 Q10 5 8 2"
            stroke="#94a3b8"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M15 6 Q17 3 15 0"
            stroke="#94a3b8"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M22 8 Q24 5 22 2"
            stroke="#94a3b8"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        {/* Text "CookOps" */}
        <g transform="translate(80, 25)">
          <text
            x="0"
            y="0"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            fontSize="24"
            fontWeight="bold"
            fill="#1f2937"
          >
            Cook
          </text>
          <text
            x="58"
            y="0"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            fontSize="24"
            fontWeight="bold"
            fill="#ff6b35"
          >
            Ops
          </text>
        </g>

        {/* Utensils decoration */}
        <g transform="translate(170, 12)">
          {/* Fork */}
          <g transform="translate(0, 0)">
            <line
              x1="2"
              y1="5"
              x2="2"
              y2="25"
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <line
              x1="0"
              y1="5"
              x2="0"
              y2="10"
              stroke="#6b7280"
              strokeWidth="1"
            />
            <line
              x1="2"
              y1="5"
              x2="2"
              y2="10"
              stroke="#6b7280"
              strokeWidth="1"
            />
            <line
              x1="4"
              y1="5"
              x2="4"
              y2="10"
              stroke="#6b7280"
              strokeWidth="1"
            />
          </g>

          {/* Knife */}
          <g transform="translate(8, 0)">
            <line
              x1="2"
              y1="5"
              x2="2"
              y2="25"
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <polygon points="0,5 4,5 3,12 1,12" fill="#6b7280" />
          </g>
        </g>
      </svg>
    </div>
  );
}
