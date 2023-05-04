import React from "react";

const Page1 = ({ state }) => {
  return (
    <div className="max-w-[1024px]">
      <div className="">
        <div className="mt-[20px] flex">
          <p
            dangerouslySetInnerHTML={{ __html: state.details }}
            className="font-epilogue font-normal text-[16px] leading-[26px] text-justify"
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Page1;
