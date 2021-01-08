import React from "react";
import "./relevant-sources.scss";
import { Collapse, Space } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import ModalAdd from "../modal-add/modal-add";
import CarretVoteUpDown from "../caret-vote-up-down/caret-vote-up-down";

//REDUX
import {
  claimResourceSelector,
  claimSelector,
} from "../../redux/Slices/claim-review-slice";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

export default function RelevantSourcesList() {
  const resources = useSelector(claimResourceSelector);
  const { ClaimId } = useSelector(claimSelector);

  return (
    <div className="relevant-sources">
      <Collapse expandIconPosition="right" className="relevant-source-collapse" >
        {resources.map((resource: any, i: number) => (
          <Panel
            header={
              <div className="resource-header">
                <div className="left-block">
                  <CarretVoteUpDown votes={resource.Votes} />
                  <h3>{resource.Title}</h3>
                </div>
                <div className="right-block">
                  <a
                    href={`http://${resource.Url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkOutlined />
                  </a>
                  <span>{resource.Date.slice(0, 10)}</span>
                </div>
              </div>
            }
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
      <ModalAdd
        title="Add Relevant Source"
        modalType="text-comment-url-date"
        claimId={ClaimId}
        buttonType="btn"
        destination="resource"
      />
    </div>
  );
}
