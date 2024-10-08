import React from "react";

const CTAButton = ({ text, onClick, disabled, className }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`font-poppins text-white py-1.5 px-5 rounded-lg bg-cta font-medium disabled:bg-cta/45 hover:bg-hovercta transition-all ${className}`}
    >
      {text}
    </button>
  );
};

export default CTAButton;
