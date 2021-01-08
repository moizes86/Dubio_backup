import React from "react";
import './caret-vote-up-down.scss';
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

const CaretVoteUpDown = ({votes}:any) => {
  return (
    <div className="carret-vote-up-down-container">
      <CaretUpFilled />
      <span>{votes}</span>
      <CaretDownFilled />
    </div>
  );
};

export default CaretVoteUpDown;