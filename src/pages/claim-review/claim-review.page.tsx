import React, { useEffect } from "react";

//STYLES AND COMPONENTS
import "./claim-review.page.scss";
import { Skeleton, Collapse } from "antd";
import ClaimReviewInfos from "../../components/claim-review-infos/claim-review-infos";
import RelevantSourcesList from "../../components/claim-review-relevant-sources/relevant-sources";
import PageHeader from "../../components/PageHeader/PageHeader";
import ClaimReviewItem from "../../components/claim-review-item/claim-review-item";
import ClaimReviewSummaries from "../../components/claim-review-summaries/claim-review-summaries";

//ROUTING
import { useParams } from "react-router-dom";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getClaimReview } from "../../redux/Slices/claim-review-slice.utils";
import {
  claimSelector,
  errorMessageSelector,
  claimLoadingSelector,
} from "../../redux/Slices/claim-review-slice";

const { Panel } = Collapse;

export default function ClaimReview() {
  const { claimId }: any = useParams();
  const claim = useSelector(claimSelector);
  const loading = useSelector(claimLoadingSelector);
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
          <ClaimReviewItem {...claim} />
          <Collapse
            defaultActiveKey={["1", "2", "3"]}
            expandIconPosition="right"
          >
            <Panel
              header="Summary"
              key="1"
              className="custom-header"
              id="summary-header"
            >
              <ClaimReviewSummaries  />
            </Panel>

            <Panel
              header="Infos: Who Made The Claim, When, And What's Their Title"
              key="2"
              className="custom-header"
            >
              <ClaimReviewInfos />
            </Panel>

            <Panel header="Relevant Sources" key="3" className="custom-header">
              <RelevantSourcesList />
            </Panel>
          </Collapse>
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
