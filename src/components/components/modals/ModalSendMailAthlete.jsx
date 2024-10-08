import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { SendMail } from "../../../services/adminServices";
import { CODES } from "../../../consts/codes";
import { ModalInfo } from "../../../components/components/modals/ModalInfo";

function SendEmailModalAthlete(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);

  const handleSubmit = (event) => {
    const send = async () => {
      const activeUser = JSON.parse(localStorage.getItem("user"));

      const obj = {
        de: activeUser.id_usuario,
        para: props.id_usuario,
        contenido_mensaje: content,
        subject_mensaje: subject,
        leido_mensaje: false,
      };
      console.log(`Sending email with subject: ${obj}`);
      const [sended] = await Promise.all([SendMail(obj)]);
      console.log(sended);
      setResponseMessage(sended);
      handleClose();
      if (sended.status === 200) {
        if (sended.data.responseCode === CODES.COD_RESPONSE_SUCCESS_REQUEST) {
          setOpenModalInfo(true);
          setSubject("");
          setContent("");
          props.setRefresh(!props.refresh);
        }
      }
    };

    send();

    // Send email using subject and content inputs
  };

  useEffect(() => {
    if (show) {
      if (props.message) {
        setSubject("Re:" + props.message.subject_mensaje);
      }
    }
  }, [show, props]);

  return (
    <>
      <div onClick={handleShow}>
        <span>
          <i className="bi bi-reply"></i>
        </span>
      </div>

      <ModalInfo
        data={responseMessage}
        open={openModalInfo}
        setOpen={setOpenModalInfo}
      />

      <Modal show={show} onHide={handleClose} size="lg" centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar Correo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Form>
            <Form.Group controlId="formSubject">
              <Form.Label className="weight__bold" style={{ fontSize: "14px" }}>
                Asunto
              </Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Ingrese el asunto"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formContent " className="mt-3">
              <Form.Label className="weight__bold" style={{ fontSize: "14px" }}>
                Contenido
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese el contenido del correo"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            style={{ fontSize: "14px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            style={{ fontSize: "14px" }}
            className="login__submit display__label weight__bold"
            variant="primary"
            onClick={handleSubmit}
            type="submit"
          >
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendEmailModalAthlete;
