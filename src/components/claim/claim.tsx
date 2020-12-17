import React from "react";
import "./claim.scss";
import DubioCard from "../DubioCard/DubioCard";
import TrendingCounter from "../TrendingCounter/TrendingCounter";


export default function Claim({ Title, Content, Bookmarks, Votes }: any) {
  
  return (
    <div className="claim-container">
      <DubioCard>
        <div className="claim-content">
          <h3>{Title}</h3>
          <p className="claim-text">{Content}</p>
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
