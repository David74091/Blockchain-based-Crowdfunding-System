import React from "react";

const Page2 = ({ state }) => {
  return (
    <div class="max-w-[1024px] bg-white rounded-lg shadow p-8">
      <h1 class="text-2xl font-bold mb-4">國防科技大學 K12 教育計畫</h1>
      <div class="flex items-center mb-8">
        <div class="w-12 h-12 rounded-full overflow-hidden mr-4">
          {/* <img
          src={state.organizeImage}
          alt="Avatar"
          class="w-full h-full object-cover"
        /> */}
        </div>
        <p class="text-gray-500 text-sm">
          由 <span class="text-blue-500 font-medium">國防科技大學</span> 發起
        </p>
      </div>
      <div class="mb-6">
        <h2 class="text-lg font-bold mb-2">計畫簡介</h2>
        <p class="text-gray-600 text-sm">
          本計畫旨在提供高中職學生更多機會接觸科技、學習程式設計，培養具備專業技能的未來科技人才。
        </p>
      </div>
      <div class="mb-6">
        <h2 class="text-lg font-bold mb-2">募資目標</h2>
        <p class="text-gray-600 text-sm">
          新台幣 <span class="text-blue-500 font-medium">100,000</span>
        </p>
        <div class="relative pt-1">
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: "50%" }}
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
          <div class="flex mb-4 justify-between text-xs">
            <div>
              <span class="text-blue-500 font-medium">NT$ 0</span>
            </div>
            <div>
              <span class="text-blue-500 font-medium">NT$ 100,000</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <p class="text-gray-500 text-sm">剩餘時間：</p>
          <p class="text-blue-500 font-bold text-sm">18 天</p>
        </div>
        <button class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium">
          贊助專案
        </button>
      </div>
    </div>
  );
};

export default Page2;
