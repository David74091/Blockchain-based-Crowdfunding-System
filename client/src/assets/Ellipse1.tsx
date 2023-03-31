export default function Ellipse1(props: Ellipse1Props) {
  return (
    <div className="left-0 top-0 absolute right-[0.41px] bottom-[-0.59px]">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 15.987 9.083 C 15.987 13.132 12.704 16.415 8.655 16.415 C 4.605 16.415 1.322 13.132 1.322 9.083 C 1.322 5.033 4.605 1.75 8.655 1.75 C 12.704 1.75 15.987 5.033 15.987 9.083 Z"
          stroke="#ABAFC7"
          strokeWidth="2"
          strokeLinecap="round"
         />
      </svg>
    </div>
  );
}

Ellipse1.defaultProps = {};

interface Ellipse1Props {}

/**
 * This component was generated from Figma with FireJet.
 * Learn more at https://www.firejet.io
 *
 * README:
 * The output code may look slightly different when copied to your codebase. To fix this:
 * 1. Include the necessary fonts. The required fonts are imported from public/index.html
 * 2. Include the global styles. They can be found in App.css
 *
 * Note: Step 2 is not required for tailwind.css output
 */
