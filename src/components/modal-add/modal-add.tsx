import React from "react";
import { Modal, Button } from "antd";
import "./modal-add.scss";

const ModalAdd = ({ title }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" className="modal-add-button" onClick={showModal}>
        Add New
      </Button>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* <input
          type="text"
          placeholder="Add summary here..."
          className="modal-add-input"
        > */}
          <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
            style={{height:'100px', width:'100%', resize:'none', border:'none'}}
          />
        {/* </input> */}
      </Modal>
    </>
  );
};

export default ModalAdd;
