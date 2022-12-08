import React from "react";
import { Modal, Button } from "react-bootstrap";
import ButtonList from "./ButtonList";
import { Fab } from "@mui/material";

function ModalDialog(props) {
  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };
  return (
    <>
      <Fab
        color="success"
        variant="extended"
        onClick={initModal}
        sx={{ textTransform: "none" }}
      >
        {props.name}
      </Fab>

      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Modal Pop Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonList
            field={"email"}
            modal={false}
            data={props.modalData}
            path="textSession"
            subject={props.subject}
          />{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDialog;
