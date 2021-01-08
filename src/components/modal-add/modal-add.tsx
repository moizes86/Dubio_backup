import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Button } from "antd";
import "./modal-add.scss";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { claimSelector } from "../../redux/Slices/claim-review-slice";
import PlusSign from "../plus-sign/plus-sign";
import {
  postClaimSummary,
  postJobTitle,
  postSource,
  postOccurrence,
  postResource,
  postClaimInfo,
} from "../../redux/Slices/claim-review-slice.utils";

type LayoutType = Parameters<typeof Form>[0]["layout"];

// This modal is used by multiple components, each one uses different variation:
// Only text area, a form with text and url, a form with text, url and date.
// HandleOK for submitting the data to the API also varies.

const ModalTextUrl = ({
  title,
  modalType,
  buttonType,
  destination,
  infoId,
}: any) => {
  const dispatch = useDispatch();
  const { ClaimId } = useSelector(claimSelector);

  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [url, setUrlText] = React.useState("");
  const [date, setDate] = React.useState("");

  const { TextArea } = Input;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    switch (destination) {
      case "summary":
        if (text) {
          dispatch(postClaimSummary(ClaimId, text));
        }
        break;
      case "job-title":
        if (text) {
          dispatch(postJobTitle(ClaimId, infoId, text));
        }
        break;
      case "source":
        if (text && url) {
          dispatch(postSource(ClaimId, infoId, { text, url }));
        }
        break;
      case "occurrence":
        if (text && date && url) {
          dispatch(postOccurrence(ClaimId,  infoId, { text, date, url }));
        }
        break;
      case "claim-info":
        if (text) {
          dispatch(postClaimInfo(ClaimId, text));
        }
        break;
      case "resource":
        if (text && comment && date && url) {
          dispatch(postResource(ClaimId, { text, comment, date, url }));
        }
        break;
    }
  };

  //FORM SETUP
  const [formLayout] = useState<LayoutType>("horizontal");
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;
  //

  return (
    <>
      <div onClick={showModal}>
        {buttonType === "btn" ? (
          <Button className="modal-add-button">Add New</Button>
        ) : (
          <PlusSign />
        )}
      </div>

      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout} layout={formLayout}>
          {modalType === "text" ? (
            // * * ONLY TEXT AREA * * //
            <textarea
              required
              id="subject"
              name="subject"
              placeholder="Write something.."
              style={{
                height: "40px",
                width: "100%",
                resize: "none",
                border: "none",
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            // * * TEXT INPUT * * //
            <Form.Item label="text" required>
              <Input
                placeholder="Insert text..."
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Item>
          )}

          {modalType.includes("url") ? (
            // * * INCLUDING URL * * //
            <Form.Item label="Url" required>
              <Input
                placeholder="Insert url here... "
                onChange={(e) => setUrlText(e.target.value)}
              />
            </Form.Item>
          ) : null}

          {modalType.includes("date") ? (
            // * * INCLUDING DATE PICKER * * //
            <Form.Item label="Date" required>
              <DatePicker
                onChange={(date: any, dateString: string) =>
                  setDate(dateString.slice(0, 10))
                }
              />
            </Form.Item>
          ) : null}

          {modalType.includes("comment") ? (
            // * * INCLUDING COMMENT * * //
            <Form.Item label="Comment" required>
              <TextArea
                rows={5}
                placeholder="Insert comment here... "
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </>
  );
};

export default ModalTextUrl;
