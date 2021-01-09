import React from "react";
import "./claim-review-item.scss";
import TrendingCounter from "../TrendingCounter/TrendingCounter";
import { Card } from 'antd';

const ClaimReviewItem = ({
  Title,
  Content,
  ClaimId,
  IsBookmarked,
  isVoted,
}: any) => {
  return (
    <div className="claim-review-item-container">
      <Card title={Title} >
        <div className="claim-review-item-content">
          <p>{Content}</p>
          <TrendingCounter
            isFireOn={false}
            isBookOn={false}
            bookCount={IsBookmarked}
            fireCount={isVoted}
          />
        </div>
      </Card>
    </div>
  );
};

export default ClaimReviewItem;
