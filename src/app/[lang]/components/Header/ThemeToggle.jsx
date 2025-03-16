"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sun = (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 171.88 171.88"
      className={styles.sun}
    >
      <g id="Layer_1-2" data-name="Layer 1">
        <circle cx="85.94" cy="85.94" r="41.39" />
        <g>
          <g id="_Radial_Repeat_" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="6.56"
              y="69.62"
              width="19.88"
              height="32.95"
              transform="translate(-69.56 102.78) rotate(-90.13)"
            />
          </g>
          <g id="_Radial_Repeat_-2" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="26.79"
              y="20.47"
              width="19.88"
              height="32.95"
              transform="translate(-15.37 36.91) rotate(-45.13)"
            />
          </g>
          <g id="_Radial_Repeat_-3" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="75.84"
              y=".02"
              width="19.88"
              height="32.95"
              transform="translate(-.04 .19) rotate(-.13)"
            />
          </g>
          <g id="_Radial_Repeat_-4" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="124.99"
              y="20.25"
              width="19.88"
              height="32.95"
              transform="translate(65.22 -84.5) rotate(44.87)"
            />
          </g>
          <g id="_Radial_Repeat_-5" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="145.44"
              y="69.31"
              width="19.88"
              height="32.95"
              transform="translate(240.81 -69.79) rotate(89.87)"
            />
          </g>
          <g id="_Radial_Repeat_-6" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="125.21"
              y="118.46"
              width="19.88"
              height="32.95"
              transform="translate(326.13 134.35) rotate(134.87)"
            />
          </g>
          <g id="_Radial_Repeat_-7" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="76.16"
              y="138.91"
              width="19.88"
              height="32.95"
              transform="translate(172.54 310.57) rotate(179.87)"
            />
          </g>
          <g id="_Radial_Repeat_-8" data-name="&amp;lt;Radial Repeat&amp;gt;">
            <rect
              x="27.01"
              y="118.68"
              width="19.88"
              height="32.95"
              transform="translate(-32.22 257) rotate(-135.13)"
            />
          </g>
        </g>
      </g>
    </svg>
  );

  const moon = (
    <svg className={styles.moon} width="800px" height="800px" viewBox="0 0 20 20" version="1.1">
      <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -7719.000000)">
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M173.99029,7576.998 C171.388688,7576.998 169.058358,7575.74775 167.591892,7573.8028 C174.222522,7575.15916 180.17047,7569.27528 178.803103,7562.59159 C180.748048,7564.05806 181.998298,7566.38839 181.998298,7568.98999 C181.998298,7573.40541 178.405705,7576.998 173.99029,7576.998 M174.610911,7559 C176.076376,7560.36937 176.993293,7562.32032 176.993293,7564.48549 C176.993293,7571.32432 168.608909,7574.54254 164.0003,7569.60961 C164.32062,7574.84985 168.66997,7579 173.99029,7579 C179.518819,7579 184.0003,7574.51852 184.0003,7568.98999 C184.0003,7563.66967 179.85015,7559.32032 174.610911,7559"
              id="moon-[#114]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );

  if (!mounted)
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={styles.themeToggle}
      >
        {theme === "dark" ? moon : sun}
      </button>
    ); // Avoid hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={styles.themeToggle}
    >
      {theme === "dark" ? moon : sun}
    </button>
  );
}
