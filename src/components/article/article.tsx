import React from "react";
import { Link } from "react-router-dom";

//STYLES
import "./article.scss";
import { Card } from "antd";

import DubioCard from "../DubioCard/DubioCard";
import TrendingCounter from "../TrendingCounter/TrendingCounter";
import Claim from "../claim/claim";
import { Collapse } from "antd";
const { Panel } = Collapse;
const { Meta } = Card;

export default function Article({
  article: {
    Title,
    BookmarkCount,
    HotCount,
    ArticleId,
    InternalUrl,
    Claims,
    ImgUrl,
    Url,
    Tags,
  },
}: any) {
  return (
    <div className="article-container">
      <DubioCard>
        <Collapse>
          <Panel
            key={`${ArticleId}-${Title}`}
            header={
              <div className="article-card-flex ">
                <div className="article-section img-title-description">
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
                          >{`${tag.Value}  `}</span>
                        ))}
                      </div>
                    }
                  />
                </div>

                <div className="article-section source-and-trending-counter">
                    <div className="source">
                        <a href={Url} rel='noreferrer noopener' target="_blank">Source</a>
                        <Link to={`/Claim-Review/${InternalUrl}`} className="link">More Details</Link>
                    </div>

                  <div className="trending-counter">
                    <TrendingCounter
                      isFireOn={false}
                      isBookOn={false}
                      bookCount={BookmarkCount}
                      fireCount={HotCount}
                      id={ArticleId}
                    />
                  </div>
                </div>
              </div>
            }
          >
            {Claims.map((claim: any, idx: any) => (
              <Claim key={`${idx}-${ArticleId}`} {...claim} />
            ))}
          </Panel>
        </Collapse>
      </DubioCard>
    </div>
  );
}
