import React from "react";
import "./claim-summary.scss";

//Redux
import { useSelector } from 'react-redux';
import { claimSummarySelector } from '../../redux/Slices/ArticleSlice';

//Components
import ModalAdd from "../modal-add/modal-add";
import ClaimItem from "../claim-item/claim-item";
import DubioFormCard from "../DubioFormCard/DubioFormCard";
import { PlusOutlined } from "@ant-design/icons";

export default function ClaimSummary({claimId}:any) {

  const summaries= useSelector(claimSummarySelector);

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
      <ModalAdd title={"Add Your Claim Summary"} type={'summary'} claimId={claimId}/>
    </>
  );
}
