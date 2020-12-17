import React from "react";
import "./hamburger.scss";
import { LayoutContext } from "../../layout.provider";

const Hamburger = () => {
  const { toggleMenuActive, menuActive } = React.useContext(LayoutContext);
  return (
    <div className="hamburger">
      <a
        id="hamburger-icon"
        onClick={toggleMenuActive}
        className={menuActive ? "active" : ""}
      >
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
      </a>
    </div>
  );
};

export default Hamburger;
