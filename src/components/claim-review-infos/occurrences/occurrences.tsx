import React from "react";
import "./occurrences.scss";
import { Button, Divider } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const Occurrences = ({ occurrences }: any) => {
  if (occurrences) {
    return (
      <>
        {occurrences.map((el: any, i: number) => (
          <Button
            key={`${i}-${el.Id}`}
            type="default"
            shape="round"
            size="large"
            className=" custom-button-location-and-place custom-button-claim-details"
          >
            {el.Title}
            <Divider type="vertical" className="divider" /> {el.Date.substr(0,10)}
            <Divider type="vertical" className="divider" /> <LinkOutlined />
          </Button>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

export default Occurrences;
