export default function Line1(props: Line1Props) {
  return (
    <div
      className="h-1.5 absolute flex w-[5px] right-[-0.82px] bottom-[-1.82px]"
    >
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 5 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 1.557 1.985 L 4.733 5.161"
          stroke="#ABAFC7"
          strokeWidth="2"
          strokeLinecap="round"
         />
      </svg>
    </div>
  );
}

Line1.defaultProps = {};

interface Line1Props {}

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
