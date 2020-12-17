import React, { useEffect } from "react";
import "./FactCheckPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClaimSummary from "../../components/claim-summary/claim-summary";
import PageHeader from "../../components/PageHeader/PageHeader";
import ClaimDetailsForm from "../../components/claim-details-container/claim-details-container";
import RelevantSourcesList from "../../components/relevant-sources/relevant-sources";
import Article from "../../components/article/article";
import { articleSelector, getArticle } from "../../redux/Slices/ArticleSlice";
import { Skeleton } from "antd";

export default function FactCheckPage() {
  const { articleInternalUrl }: any = useParams();
  const article = useSelector(articleSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticle({ type: "url", data: articleInternalUrl }));
  }, [dispatch]);

  return (
    <div className="page-container fact-check-page-container">
      <PageHeader
        bannerName="banner"
        leftImageName="game-console"
        pageTitle="Fact-Check Claim"
        subTitle="Submit your assessment of this claim"
      />

      {article ? (
        <>
          <Article article={article} />
          <ClaimSummary />
          <ClaimDetailsForm />
          <RelevantSourcesList />
        </>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
}
