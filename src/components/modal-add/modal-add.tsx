import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import "./modal-add.scss";
import {
  postClaimSummary,
  postRelevantSource,
} from "../../redux/Slices/article-slice.utils";

const ModalAdd = ({ title, type, claimId }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");
  console.log("TYPE  ", type);
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    switch (type) {
      case "summary":
        dispatch(postClaimSummary(claimId, modalText));
      case "relevant-source":
        dispatch(postRelevantSource(claimId, modalTitle, modalText));
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button type={type} className="modal-add-button" onClick={showModal}>
        Add New
      </Button>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {type == "relevant-source" ? (
          <div className="modal-relevant-source">
            Title: <textarea
              id="relevant-source-title"
              name="relevant-source-title"
              placeholder="Title..."
              style={{
                height: "30px",
                width: "100%",
                resize: "none",
                border: "none",
              }}
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
            />
          </div>
        ) : null}

        Comment: <textarea
          id="subject"
          name="subject"
          placeholder="Write something.."
          style={{
            height: "40px",
            width: "100%",
            resize: "none",
            border: "none",
          }}
          value={modalText}
          onChange={(e) => setModalText(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalAdd;
