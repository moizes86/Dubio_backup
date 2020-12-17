import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
// import { getSettings } from "../../redux/Slices/SettingsSlice";
import { getArticles } from "../../redux/Slices/ArticleSlice";
import SuspiciousClaimsFilter from "../../components/suspicious-claims-filter/suspicious-claims-filter";
import ArticlesList from "./article-list/articles-list";

export default function ArticlesDashboard() {
  const dispatch = useDispatch();
  // dispatch(getSettings());

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div className="page-container">
      <PageHeader
        bannerName="banner"
        leftImageName="streams-icon"
        pageTitle="Suspicious Claims"
        subTitle="See which suspicious claims are trending online!"
      />
      <SuspiciousClaimsFilter />
      <ArticlesList />
    </div>
  );
}
