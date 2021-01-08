import React from "react";
import "./claim-review-infos.scss";

import { Timeline, Collapse } from "antd";

//COMPONENTS
import ModalAdd from "../modal-add/modal-add";
import JobTitles from "./job-titles/job-titles";
import Occurrences from "./occurrences/occurrences";
import Sources from "./sources/sources";

//REDUX
import { useSelector } from "react-redux";
import { claimReviewInfosSelector } from "../../redux/Slices/claim-review-slice";

const { Panel } = Collapse;

export default function ClaimReviewInfos() {
  const infos = useSelector(claimReviewInfosSelector);
  return (
    <div className="claim-review-infos">
      <Collapse >
        {infos.map((el: any, idx: number) => (
            <Panel header={"HEADER"} key={`${idx}-${el.Id}-Infos`}>
              <Timeline style={{ marginLeft: "20px" }}>
                <Timeline.Item>
                  <b>Job Titles (select one):</b>
                  <br />
                  <div className="timeline-item-container">
                    <JobTitles jobTitles={el.JobTitles} />
                    <ModalAdd
                      title="Add Job Title"
                      modalType="text"
                      infoId={el.Id}
                      destination="job-title"
                    />
                  </div>
                </Timeline.Item>

                <Timeline.Item>
                  <b>Sources: Claim Maker Info (select one):</b>
                  <br />
                  <div className="timeline-item-container">
                    <Sources sources={el.ClaimSources} />
                    <ModalAdd
                      title="Add Source"
                      modalType="text-url"
                      infoId={el.Id}
                      destination="source"
                    />
                  </div>
                </Timeline.Item>

                <Timeline.Item>
                  <b>Occurrences (multiple selection is possible):</b>
                  <br />
                  <div className="timeline-item-container">
                    <Occurrences occurrences={el.ClaimOccurrences} />
                    <ModalAdd
                      title="Add Occurence: When And Where?"
                      modalType="text-url-date"
                      infoId={el.Id}
                      destination="occurrence"
                    />
                  </div>
                </Timeline.Item>
              </Timeline>
            </Panel>
        ))}
      </Collapse>
      <ModalAdd
        title="Who Made The Claim, Where And When?"
        modalType="text"
        buttonType="btn"
        destination="claim-info"
      />
    </div>
  );
}
