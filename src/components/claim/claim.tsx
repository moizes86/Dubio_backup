import React from "react";
import "./claim.scss";
import { Link } from "react-router-dom";
import DubioCard from "../DubioCard/DubioCard";
import TrendingCounter from "../TrendingCounter/TrendingCounter";
import { useDispatch } from "react-redux";
import { bookmarkClaimThunk, voteClaimThunk } from "../../redux/Slices/ArticleSlice";

export default function Claim({
  Title,
  Content,
  Bookmarks,
  Votes,
  InternalUrl,
  ClaimId,
  articleIndex,
  claimIndex,
  IsVoted,
  IsBookmarked
}: any) {
  const dispatch = useDispatch();

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
            isFireOn={IsVoted}
            isBookOn={IsBookmarked}
            bookCount={Bookmarks}
            fireCount={Votes}
            onFireClick={()=>dispatch(voteClaimThunk(ClaimId,articleIndex, claimIndex))}
            onBookmarkClick={()=>dispatch(bookmarkClaimThunk(ClaimId,articleIndex, claimIndex))}
          />
        </div>
      </DubioCard>
    </div>
  );
}
