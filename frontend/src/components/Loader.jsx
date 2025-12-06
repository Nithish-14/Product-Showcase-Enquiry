import React from "react";

export default function Loader({ small = false }) {
  return (
    <div
      className={`flex items-center justify-center ${small ? "py-2" : "py-8"}`}
    >
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}
