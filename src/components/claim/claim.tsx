import React from "react";
import "./claim.scss";
import { Link } from "react-router-dom";
import DubioCard from "../DubioCard/DubioCard";
import TrendingCounter from "../TrendingCounter/TrendingCounter";

export default function Claim({
  Title,
  Content,
  Bookmarks,
  Votes,
  InternalUrl,
  ClaimId
}: any) {
  return (
    <div className="claim-container">
      <DubioCard>
        <div className="claim-content">
          <Link to={`/Claim-Review/${InternalUrl}/${ClaimId}`} className="link">
          <h3>{Title}</h3>
            <p className="claim-text">{Content}</p>
          </Link>
        </div>
        <div className="claim-trending-counter">
          <TrendingCounter
            isFireOn={false}
            isBookOn={false}
            bookCount={Bookmarks}
            fireCount={Votes}
            id={""}
          />
        </div>
      </DubioCard>
    </div>
  );
}
