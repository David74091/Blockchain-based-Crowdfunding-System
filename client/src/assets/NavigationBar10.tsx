import Heart from "assets/Heart";
import Ellipse1 from "assets/Ellipse1";
import Line1 from "assets/Line1";
import ArrowDown from "assets/ArrowDown";
import Basket from "assets/Basket";
import Path208 from "assets/Path208";
import Path5670 from "assets/Path5670";
import Group7836 from "assets/Group7836";
import Group7837 from "assets/Group7837";

export default function NavigationBar10(props: NavigationBar10Props) {
  return (
    <div
      className={`relative bg-gray-100 text-left w-[1920px] h-[170px] overflow-clip font-['Quicksand']`}
      style={props.style}
    >
      <p
        className="absolute text-base font-medium inline m-0 left-[1315px] top-[75px] leading-[25px] text-[rgba(112,121,139,1)]"
      >
        License
      </p>
      <p
        className="absolute text-base font-medium inline m-0 left-[1399px] top-[75px] leading-[25px] text-[rgba(112,121,139,1)]"
      >
        About
      </p>
      <p
        className="absolute text-base font-medium inline m-0 left-[1499px] top-[75px] leading-[25px] text-[rgba(112,121,139,1)]"
      >
        {"Log In "}
      </p>
      <p
        className="absolute text-xl font-bold inline m-0 left-[1573px] top-[75px] tracking-[-1px] leading-[normal] text-[rgba(96,1,211,1)]"
      >
        Sign Up
      </p>
      <div
        className="absolute w-[28.02px] h-[25.18px] left-[1676.51px] top-[71.7px] overflow-clip"
      >
        <Heart />
      </div>
      <div
        className="absolute bg-white w-[830.54px] h-[60px] left-[431.25px] top-[54.75px] rounded-[33px]"
       />
      <div
        className="absolute w-[184px] h-[50px] left-[1072.69px] top-[59.75px] drop-shadow-lg bg-[rgba(96,1,211,1)] rounded-[33px]"
       />
      <p
        className="absolute text-base font-medium leading-5 inline m-0 left-[498px] top-[75px] text-[rgba(171,175,199,1)]"
      >
        Search
      </p>
      <div
        className="absolute w-[17.41px] h-[17.41px] left-[461.32px] top-[75.75px] overflow-clip"
      >
        <Ellipse1 />
        <Line1 />
      </div>
      <p
        className="absolute font-medium text-white inline m-0 left-[1105px] top-[76px] text-[15px] leading-[19px]"
      >
        All Categories
      </p>
      <ArrowDown />
      <Basket />
      <div
        className="absolute rounded-full w-[22.46px] h-[22.46px] left-[1756.82px] top-[80.12px] bg-[rgba(96,1,211,1)]"
       />
      <p
        className="absolute text-sm font-medium text-white inline m-0 left-[1764px] top-[83px] leading-[18px]"
      >
        0
      </p>
      <Path208 />
      <p
        className="absolute text-xl font-bold inline m-0 left-[322px] top-[75px] tracking-[-1px] leading-[normal] text-[rgba(8,20,32,1)]"
      >
        Browse
      </p>
      <Path5670 />
      <Group7836 />
      <Group7837 />
    </div>
  );
}

NavigationBar10.defaultProps = {
  style: {},
};

interface NavigationBar10Props {
  style: Object;
}

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
