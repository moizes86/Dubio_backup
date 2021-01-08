import React from "react";
import "./claim-review-summaries.scss";

//Redux
import { useSelector } from "react-redux";
import { claimSummarySelector } from "../../redux/Slices/claim-review-slice";

//Components
// import ModalAddSummary from "../modals/modal-add-summary/modal-add-summary";
import ClaimSummaryItem from "./summary/summary";
import ModalAdd from "../modal-add/modal-add";

export default function ClaimReviewSummaries({ claimId }: any) {
  const summaries = useSelector(claimSummarySelector);

  return (
    <>
      <div className="claim-summary-content">
        {summaries.map((summary: any, idx: any) => (
          <ClaimSummaryItem
            key={`${idx}-${summary.Title}`}
            text={summary.Title}
            numberOfLikes={summary.Votes}
            summaryId={summary.Id}
            isVotedUp={summary.isVotedUp}
            isVotedDown={summary.isVotedDown}
          />
        ))}
      </div>
      <ModalAdd title="Add Summary" modalType="text" buttonType="btn" destination="summary"/>
    </>
  );
}
