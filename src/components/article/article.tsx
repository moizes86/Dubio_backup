import React from "react";
import { Link } from "react-router-dom";

//STYLES
import "./article.scss";
import { Card } from "antd";

import DubioCard from "../DubioCard/DubioCard";
import TrendingCounter from "../TrendingCounter/TrendingCounter";
import Claim from "../claim/claim";
import { Collapse } from "antd";
import { useDispatch } from "react-redux";
const { Panel } = Collapse;
const { Meta } = Card;

export default function Article({
  article: {
    Title,
    Bookmarks,
    Votes,
    ArticleId,
    InternalUrl,
    Claims,
    ImgUrl,
    Url,
    Tags,
    
  },
  articleIndex
}: any) {
  const dispatch = useDispatch();
console.log("articleIndex:", articleIndex);

  return (
    <div className="article-container">
      <DubioCard>
        <Collapse>
          <Panel
            key={`${ArticleId}-${Title}`}
            header={
              <div className="article-card-flex ">
               
                <div className="article-section img-title-description">
                  <Link to={`/Claim-Review/${InternalUrl}`} className="link">
                      <Meta
                        avatar={
                          <div
                          className="img-box"
                          style={{ backgroundImage: `url(${ImgUrl})` }}
                          ></div>
                        }
                        title={Title}
                        description={
                          <div>
                            {Tags.map((tag: any, idx: any) => (
                              <span
                              key={`${idx}-${tag.value}`}
                              >{`${tag.Value}${idx < Tags.length - 1? ',': '' }  `}</span>
                              ))}
                          </div>
                        }
                        />
                  </Link>
                </div>

                <div className="article-section source-and-trending-counter"onClick={(ev)=> ev.stopPropagation()}>
                  <div className="source" >
                      <a href={Url} rel='noreferrer noopener' target="_blank">Source</a>            
                  </div>

                  <div className="trending-counter">
                    <TrendingCounter
                      isFireOn={false}
                      isBookOn={false}
                      bookCount={Bookmarks}
                      fireCount={Votes}
                    />
                  </div>
                </div>
              </div>
            }
          >
            {Claims.map((claim: any, idx: any) => (
              <Claim key={`${idx}-${ArticleId}`} {...claim} articleIndex={articleIndex} claimIndex={idx}/>
            ))}
          </Panel>
        </Collapse>
      </DubioCard>
    </div>
  );
}
