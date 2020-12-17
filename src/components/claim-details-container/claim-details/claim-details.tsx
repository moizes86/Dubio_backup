import React from "react";
import "./claim-details.scss";

import { Timeline, Collapse } from "antd";
import ClaimDetailsJobTitle from "./claim-details-job-title/claim-details-job-title";
import ClaimDetailsMaker from "./claim-maker/claim-maker";
import ClaimDetailsLocationAndPlace from "./claim-details-location-and-date/claim-details-location-and-date";
import PlusSign from "../../plus-sign/plus-sign";
import CollapsibleHeader from "../../collapsible-header/collapsible-header";
const { Panel } = Collapse;

export default function ClaimDetails({ id }: any) {
  const claimHeader = React.createElement(CollapsibleHeader, {
    title: "Donald Trump",
    dates: ["12 February 2020", "20 June 2020", "20 June 2020", "20 June 2020"],
    rate: 10,
  });

  return (
    <div className="claim-details">
      <Collapse defaultActiveKey={"1"}>
        <Panel header={claimHeader} key={id}>
          <Timeline style={{ marginLeft: "20px" }}>
            {/* JOB TITLE */}
            <Timeline.Item>
              <b>Job Title (select one):</b>
              <br />
              <div className="claim-buttons-tags-container">
                <ClaimDetailsJobTitle
                  jobTitles={["President of the United States", " President"]}
                />
                <PlusSign />
              </div>
            </Timeline.Item>

            {/* CLAIM MAKER */}
            <Timeline.Item>
              <b>Claim Maker Info(select one):</b>
              <br />
              <div className="claim-buttons-tags-container">
                <ClaimDetailsMaker
                  infoLinks={["www.wikipedia.com", "www.cnn.com"]}
                />
                <PlusSign />
              </div>
            </Timeline.Item>

            {/**LOCATION AND DATE */}
            <Timeline.Item>
              <b>Claim Location and Date (multiple selection is possible):</b>
              <br />
              <div className="claim-buttons-tags-container">
                <ClaimDetailsLocationAndPlace
                  additionalInfo={[
                    { location: "CNN Intreview", date: "12 February 2020" },
                    {
                      location: "Florida Election Rally",
                      date: "22 March 2020",
                    },
                  ]}
                />
                <PlusSign />
              </div>
            </Timeline.Item>
          </Timeline>
        </Panel>
      </Collapse>
    </div>
  );
}
