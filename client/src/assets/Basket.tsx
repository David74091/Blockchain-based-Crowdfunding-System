export default function Basket(props: BasketProps) {
  return (
    <div className="w-6 absolute h-[30px] left-[1744.37px] top-[67.7px]">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 24 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 23.549 25.852 L 21.879 7.035 C 21.849 6.662 21.537 6.38 21.159 6.38 H 17.64 C 17.634 3.251 15.088 0.704 11.96 0.704 C 8.831 0.704 6.286 3.251 6.279 6.38 H 2.761 C 2.389 6.38 2.076 6.662 2.04 7.035 L 0.371 25.852 C 0.371 25.876 0.371 25.894 0.371 25.918 C 0.371 28.014 2.298 29.72 4.664 29.72 H 19.255 C 21.621 29.72 23.549 28.014 23.549 25.918 C 23.549 25.894 23.549 25.876 23.549 25.852 Z M 11.96 2.145 C 14.296 2.145 16.193 4.043 16.199 6.38 H 7.721 C 7.727 4.043 9.624 2.145 11.96 2.145 Z M 19.255 28.272 H 4.664 C 3.103 28.272 1.83 27.233 1.812 25.942 L 3.421 7.821 H 6.279 V 8.516 C 6.279 8.912 6.604 9.236 7 9.236 C 7.396 9.236 7.721 8.912 7.721 8.516 V 7.821 H 16.199 V 8.516 C 16.199 8.912 16.523 9.236 16.92 9.236 C 17.316 9.236 17.64 8.912 17.64 8.516 V 7.821 H 20.498 L 22.108 25.948 C 22.09 27.233 20.817 28.272 19.255 28.272 Z"
          fill="black"
         />
      </svg>
    </div>
  );
}

Basket.defaultProps = {};

interface BasketProps {}

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
