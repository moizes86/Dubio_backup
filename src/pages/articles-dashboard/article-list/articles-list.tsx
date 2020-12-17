import React from "react";
import { useSelector } from "react-redux";
import {
  articlesArrSelector,
  // articlesLoadingSelector,
} from "../../../redux/Slices/ArticleSlice";
import Article from "../../../components/article/article";
import { Skeleton } from "antd";
import "./articles-list.scss";

export default function ArticlesList() {
  const articles = useSelector(articlesArrSelector);
  return (
    <div className="articles-list">
      {articles ? (
        articles.map((article: any) => {
          return (
            <Article
              article={article}
              key={article.ArticleId + article.Title}
            />
          );
        })
      ) : (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      )}
    </div>
  );
}
