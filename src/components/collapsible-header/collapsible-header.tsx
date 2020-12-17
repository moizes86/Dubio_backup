import React from "react";
import "./collapsible-header.scss";

import {
  CaretUpFilled,
  CaretDownFilled,
  LinkOutlined,
} from "@ant-design/icons";

interface ICollapsibleHeader {
  title: string;
  dates: string[];
  rate: number;
}

export default function CollapsibleHeader({rate, title, dates}: ICollapsibleHeader) {
  return (
    <div className="claim-form-header">
      <div className="claim-form-header-counter">
        <CaretUpFilled />
        <p>{rate}</p>
        <CaretDownFilled />
      </div>
      <div className="claim-maker">
        <b>{title}</b>
      </div>
      <div className="claim-dates-made-container">
        {dates.map((el: any, i: number) => (
          <div key={`${i}-${el}`} className="claim-date-made">
            <LinkOutlined /> <span>{el}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
