// DonationAlert.js
import React from "react";

const Backdrop = () => (
  <div
    className="fixed inset-0 z-40 bg-black opacity-50"
    style={{ backdropFilter: "blur(3px)" }}
  ></div>
);

const DonationAlert = ({ onClose, onConfirm, amount }) => {
  return (
    <>
      <Backdrop />
      <div className="w-[500px] fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg alert">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <div className="ml-2 font-semibold">您確定要捐款 NT$ {amount}？</div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <button className="mr-2 btn btn-ghost" onClick={onClose}>
            取消
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            確認
          </button>
        </div>
      </div>
    </>
  );
};

export default DonationAlert;
