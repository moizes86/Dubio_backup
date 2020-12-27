import React from "react";
import "./claim-review-item.scss";
import DubioFormCard from "../DubioFormCard/DubioFormCard";
import TrendingCounter from "../TrendingCounter/TrendingCounter";

const ClaimReviewItem = ({
  Title,
  Content,
  ClaimId,
  IsBookmarked,
  isVoted,
}: any) => {
  return (
    <div className="claim-review-item-container">
      <DubioFormCard title={Title.toUpperCase()} submitButtonText={"foo"}>
        <div className="claim-review-item-content">
          <p>{Content}</p>
          <TrendingCounter
            isFireOn={false}
            isBookOn={false}
            bookCount={IsBookmarked}
            fireCount={isVoted}
            id={ClaimId}
          />
        </div>
      </DubioFormCard>
    </div>
  );
};

export default ClaimReviewItem;
