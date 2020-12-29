import React from "react";
import Select from "antd/lib/select";
import "./DubioSelectInput.scss";
interface IOption {
  label: string;
  value: string;
}
export default function DubioSelectInput(props: {
  options: IOption[];
  onChange: (value: any) => void;
  defaultValue: string;
  label: string;
  value: string;
}) {
  return (
    <div className="dubio-input-container">
      <label className="dubio-input-label">{props.label}</label>
      <Select
        size="large"
        className="dubio-input"
        bordered={false}
        style={{ width: 140 }}
        {...props}
      ></Select>
    </div>
  );
}
