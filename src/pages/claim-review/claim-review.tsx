import React, { useEffect } from "react";

//STYLES AND COMPONENTS
import "./claim-review.scss";
import { Skeleton } from "antd";
import ClaimSummary from "../../components/claim-summary/claim-summary";
import ClaimDetailsForm from "../../components/claim-details-container/claim-details-container";
import RelevantSourcesList from "../../components/relevant-sources/relevant-sources";
import PageHeader from "../../components/PageHeader/PageHeader";
import ClaimReviewItem from '../../components/claim-review-item/claim-review-item';

//ROUTING
import { useParams } from "react-router-dom";
//REDUX

import { useDispatch, useSelector } from "react-redux";
import { getClaimReview } from "../../redux/Slices/article-slice.utils";
import {
  claimSelector,
  articlesLoadingSelector,
  errorMessageSelector,
} from "../../redux/Slices/ArticleSlice";

export default function ClaimReview() {
  const { claimId }: any = useParams();
  const claim = useSelector(claimSelector);
  const loading = useSelector(articlesLoadingSelector);
  const errorMessage = useSelector(errorMessageSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClaimReview(claimId));
  }, [dispatch]);

  return (
    <div className="page-container fact-check-page-container">
      <PageHeader
        bannerName="banner"
        leftImageName="game-console"
        pageTitle="Fact-Check Claim"
        subTitle="Submit your assessment of this claim"
      />

      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : claim ? (
        <>
          <ClaimReviewItem {...claim.Claim} />
          <ClaimSummary
            claimId={claim.Claim.ClaimId}
            summaries={claim.Summaries}
          />
          <ClaimDetailsForm />
          <RelevantSourcesList />
        </>
      ) : (
        <>
          <h2>{errorMessage.message}</h2>
          <p>{errorMessage.stack}</p>
        </>
      )}
    </div>
  );
}
