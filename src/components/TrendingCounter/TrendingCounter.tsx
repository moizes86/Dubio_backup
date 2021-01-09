import React from "react";

import {
  FireOutlined,
  BookOutlined,
  FireFilled,
  BookFilled,
} from "@ant-design/icons";

import "./TrendingCounter.scss";

interface ITrendingCounter {
  isFireOn: boolean;
  fireCount: number;
  isBookOn: boolean;
  bookCount: number;
  onFireClick?: () => void;
  onBookmarkClick?: () => void;
}
function TrendingCounter({
  isFireOn,
  fireCount,
  isBookOn,
  bookCount,
  onFireClick,
  onBookmarkClick
}: ITrendingCounter) {

  return (
    <div className="trending-count-container">
      <div onClick={onFireClick}>
        {isFireOn ? (
          <FireFilled className="trend-icon icon-filled" />
        ) : (
          <FireOutlined className="trend-icon" />
        )}

        <div className="trend-count">{fireCount}</div>
      </div>
      <div onClick={onBookmarkClick}>
        {isBookOn ? (
          <BookFilled className="trend-icon icon-filled" />
        ) : (
          <BookOutlined className="trend-icon" />
        )}

        <div className="trend-count">{bookCount}</div>
      </div>
    </div>
  );
}

export default (TrendingCounter);
