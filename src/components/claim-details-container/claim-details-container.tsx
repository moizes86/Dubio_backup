import React from "react";
import "./claim-details-container.scss";

import DubioFormCard from "../DubioFormCard/DubioFormCard";
import ClaimDetails from "./claim-details/claim-details";
import ModalAdd from "../modal-add/modal-add";

export default function ClaimDetailsContainer() {
  return (
    <div className="claim-details-container">
      <DubioFormCard
        title="Claim Details: Who? When?"
        submitButtonText="Add new"
      >
        {/* <div className="claim-details"> */}
        {/* <div className="">
          <ClaimDetails id="1" />
          <ClaimDetails id="2" />
          <ClaimDetails id="3" />
        </div> */}
      </DubioFormCard>
      <ModalAdd title="Who Made The Claim, Where And When?" type={"summary"} />
    </div>
  );
}
