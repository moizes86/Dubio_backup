import React from "react";
import "./job-titles.scss";
import { Button } from "antd";

const JobTitles = ({ jobTitles }: any) => {
  if (jobTitles) {
    return (
      <div className="job-titles-container">
        {jobTitles.map((el: any, i: number) => (
          <Button
            key={`${i}-${el}`}
            type="default"
            size="large"
            shape="round"
            className="custom-button-claim-details"
          >
            {el.Title}
          </Button>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default JobTitles;
