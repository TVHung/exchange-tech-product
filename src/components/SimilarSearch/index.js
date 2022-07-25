import React, { useState } from "react";
import "./_similarSearch.scss";
import { Modal } from "react-bootstrap";

export default function SimilarSearch() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const searchProductSimilar = (id) => {};

  return (
    <div>
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tìm sản phẩm tương tự</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => handleClose()}
          >
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
