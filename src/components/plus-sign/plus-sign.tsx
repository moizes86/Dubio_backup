import React from "react";
import "./plus-sign.scss";


const PlusSign = ({ customClassName, type, title, infoId }: any) => {
  return (
    <div className="plus-sign-container">
      <span className={`plus-sign ${customClassName}`}> +
      </span>
    </div>
  );
};

export default PlusSign;
