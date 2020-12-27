import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import ModalAdd from "../modal-add/modal-add";
import "./claim-summary.scss";
import ClaimItem from "../claim-item/claim-item";
import DubioFormCard from "../DubioFormCard/DubioFormCard";
export default function ClaimSummary({ summaries, claimId }: any) {
  return (
    <>
      <DubioFormCard
        title="Claim summary"
        rightHeaderIcon={
          <PlusOutlined style={{ color: "white", fontSize: "1.1rem" }} />
        }
        submitButtonText="Add new"
      >
        <div className="claim-summary-content">
          {summaries.map((summary: any, idx: any) => (
            <ClaimItem
              key={`${idx}-${summary.Title}`}
              text={summary.Title}
              numberOfLikes={summary.Votes}
              claimId={claimId}
            />
          ))}
        </div>
      </DubioFormCard>
      <ModalAdd title={"Add Your Claim Summary"} />
    </>
  );
}
