import React, { useState } from "react";
import DubioCard from "../DubioCard/DubioCard";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
// import ModalAdd from "../modal-add/modal-add";
// import { Button } from "antd";
import "./DubioFormCard.scss";
interface IDubioFormCard {
  rightHeaderIcon?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit?: () => void;
  submitButtonText: string;
  title: string;
  collapsible?: boolean;
}
export default function DubioFormCard({
  rightHeaderIcon,
  children,
  onSubmit,
  submitButtonText,
  title,
  collapsible = false,
}: IDubioFormCard) {
  const [isOpen, setIsOpen] = useState(false);
  //if not collapsible or is collapsible and is open true show content.
  const showContent = !collapsible || (collapsible && isOpen);
  return (
    // <div className="claim-summary-container">
    <div className="dubio-card-container">
      <DubioCard
        type="inner"
        title={title}
        extra={
          <div>
            <div onClick={() => setIsOpen(!isOpen)}>
              {collapsible &&
                (isOpen ? (
                  <UpOutlined style={{ color: "white", fontSize: "1.1rem" }} />
                ) : (
                  <DownOutlined
                    style={{ color: "white", fontSize: "1.1rem" }}
                  />
                ))}
            </div>
            {rightHeaderIcon && <a href="#">{rightHeaderIcon}</a>}
          </div>
        }
      >
        {showContent && children}
      </DubioCard>
    </div>
  );
}
