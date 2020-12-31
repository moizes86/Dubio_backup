import React from "react";
import "./relevant-sources.scss";
import { Collapse } from "antd";
import DubioFormCard from "../DubioFormCard/DubioFormCard";
import PlusSign from "../plus-sign/plus-sign";
import ModalAdd from "../modal-add/modal-add";
import CarretVoteUpDown from "../caret-vote-up-down/caret-vote-up-down";

//REDUX
import {
  claimResourceSelector,
  claimSelector,
} from "../../redux/Slices/ArticleSlice";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

export default function RelevantSourcesList() {
  const plusSignComponent = React.createElement(PlusSign, {
    customClassName: "relevat-source-component",
  });

  const resources = useSelector(claimResourceSelector);
  const { Claim } = useSelector(claimSelector);

  return (
    <div className="relevant-sources">
      <DubioFormCard
        title="Relevant sources for fact-checking this claim"
        collapsible={false}
        submitButtonText="Add new"
      >
        <Collapse
          expandIconPosition="right"
          className="relevant-source-collapse"
          defaultActiveKey={[
            "0-Intreview: Donald Trump On The Haward Stern Show",
          ]}
        >
          {resources.map((resource: any, i: number) => (
            <Panel
              header={
                <div className="resource-header">
                  <div className="left-block">
                    <CarretVoteUpDown votes={resource.Votes} />
                    <h3>{resource.Title}</h3>
                  </div>
                  <span>{resource.Date.slice(0, 10)}</span>
                </div>
              }
              // extra={plusSignComponent}
              className="relevant-source-panel"
              key={`${i}-${resource.Title}`}
            >
              <div className="source-content">
                <span className="source-content-header-guide">
                  Explain why this source is relevant
                </span>
                <p>{resource.Comment}</p>
              </div>
            </Panel>
          ))}
        </Collapse>
      </DubioFormCard>
      <ModalAdd title={"Add Relevant Source"} type={'relevant-source'} claimId={Claim.ClaimId}/>
    </div>
  );
}
