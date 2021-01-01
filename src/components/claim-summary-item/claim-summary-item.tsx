import React from 'react';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import './claim-summary-item.scss';

interface IClaimSummaryItem {
  text: string;
  numberOfLikes: number;
  claimId: number;
}

export default function ClaimSummaryItem({ text, numberOfLikes, claimId }: IClaimSummaryItem) {
  function claimVoteUp(){
    console.log(claimId);
  }
  return (
    <div className="claim-summary-item">
      <div className="voting-button">
        <CaretUpFilled onClick={()=>claimVoteUp()}/>
        <div>{numberOfLikes}</div>
        <CaretDownFilled />
      </div>

      <div className="claim-text">{text}</div>
    </div>
  );
}
