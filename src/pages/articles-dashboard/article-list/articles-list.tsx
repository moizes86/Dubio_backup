import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneToPageNumber,
  articlesArrSelector, articlesLoadingSelector,
  // articlesLoadingSelector,
} from "../../../redux/Slices/ArticleSlice";
import Article from "../../../components/article/article";
import { Skeleton } from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import "./articles-list.scss";

export default function ArticlesList() {
  const articles = useSelector(articlesArrSelector);
  const isLoading = useSelector(articlesLoadingSelector);
  const dispatch = useDispatch();

  
const loadingComponent = (
  <div className="loader" key={0}>
    <div>
      Loading ...
    </div>
    <Skeleton active />
    <Skeleton active />
    <Skeleton active />
  </div>
  )

  return (
    <div className="articles-list">
      {!isLoading  &&  articles? (
        <InfiniteScroll
        pageStart={0}
        loadMore={()=> {

          console.log(1);
          
          dispatch(addOneToPageNumber())
        }
        }
        useWindow={false}
        hasMore={true || false}
        // loader={loadingComponent}
        >
         <div className="tracks">

           {articles.map((article: any, articleIndex: number) => {
             console.log("articleIndex:", articleIndex);
             
             return (
               <Article
                  article={article}
                  key={article.ArticleId + article.Title}
                  articleIndex={articleIndex}
               />
               );
              })}
          </div>
        </InfiniteScroll>
      ) : 
        loadingComponent}
    </div>
  );
}
