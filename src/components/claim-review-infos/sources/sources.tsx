import React from "react";
import "./sources.scss";
import { Button, Divider } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const Sources = ({ sources }: any) => {
  if (sources) {
    return (
      <>
        {sources.map((el: any, i: number) => (
          <Button
            key={`${i}-${el.Id}`}
            type="default"
            size="large"
            shape="round"
            className="custom-button-claim-details"
          >
            {el.Title}
            <Divider type="vertical" className="divider" /> <LinkOutlined />
          </Button>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

export default Sources;
