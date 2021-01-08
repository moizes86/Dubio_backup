import React from "react";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import "./summary.scss";

//REDUX
import { postSummaryVoteUp } from "../../../redux/Slices/claim-review-slice.utils";
import { useDispatch } from "react-redux";

interface ISummary {
  text: string;
  numberOfLikes: number;
  summaryId: number;
  isVotedUp: boolean;
  isVotedDown: boolean;
}

export default function Summary({
  text,
  numberOfLikes,
  summaryId,
  isVotedUp,
  isVotedDown,
}: ISummary) {

  const dispatch = useDispatch();

  return (
    <div className="summary">
      <div className="voting-button">
        <CaretUpFilled
          onClick={() =>
            dispatch(postSummaryVoteUp({ summaryId, isVotedUp, isVotedDown }))
          }
        />
        <div>{numberOfLikes}</div>
        <CaretDownFilled />
      </div>

      <div className="claim-text">{text}</div>
    </div>
  );
}
