import React from "react";
import {Button, Modal} from "react-bootstrap";

interface ModalProps {
    children?: React.ReactNode,
    title: string,
    isOpen: boolean,
    onHide: () => void
}

export function ModalScreen(props: ModalProps) {

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.isOpen}
        >
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    )
}