// CustomAlert.js
import React from "react";

const CustomAlert = ({ message, type, onClose, icon }) => {
  return (
    <div
      className={`fixed z-50 top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded-md shadow-lg ${
        type === "error" ? "alert-error" : "alert-success"
      }`}
    >
      <div className="flex items-center">
        {icon === "error" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}

        <span className="ml-2">{message}</span>
      </div>
    </div>
  );
};

export default CustomAlert;
