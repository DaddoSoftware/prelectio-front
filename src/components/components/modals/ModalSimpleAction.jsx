import Modal from "react-bootstrap/Modal";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export const ModalSimpleAction = (props) => {
  return (
    <Modal
      show={props.open}
      onHide={props.action}
      centered
      className="modal__info"
    >
      <Modal.Body style={{ padding: "4rem" }}>
        <Row>
          <Col xs={12}>
            {props.data?.title && (
              <p className="display__small text-white weight__bold">
                {props.data.title}
              </p>
            )}
            {props.data?.message && (
              <p className="text-white" style={{ marginTop: "1rem" }}>
                {props.data.message}
              </p>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          className="login__submit display__label weight__bold"
          variant="primary"
          onClick={props.action}
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
