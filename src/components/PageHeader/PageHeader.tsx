import React from "react";
import "./PageHeader.scss";

interface IPageHeader {
  bannerName: string;
  leftImageName: string;
  pageTitle: string;
  subTitle: string;
}

export default function PageHeader({
  bannerName,
  leftImageName,
  pageTitle,
  subTitle,
}: IPageHeader) {
  return (
    <div className="header-Banner">
      <img
        className="cropped-banner"
        src={require(`../../images/${bannerName}.png`)} alt=""
      />
      <div className="header-content">
        <img
          className="computer-img"
          src={require(`../../images/${leftImageName}.png`)}
          alt=""
        />
        <div className="page-title-container">
          <div className="page-title">{pageTitle}</div>
          <div className="page-sub-title">{subTitle}</div>
        </div>
      </div>
    </div>
  );
}
