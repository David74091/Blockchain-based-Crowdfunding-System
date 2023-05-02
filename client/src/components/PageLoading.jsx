import React from "react";

const PageLoading = () => {
  return (
    <div className="w-full h-[720px] flex flex-col justify-center items-center">
      <progress className="progress progress-secondary w-56 "></progress>
      <h1 className="mt-3">請稍等...</h1>
    </div>
  );
};

export default PageLoading;
