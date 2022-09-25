import React from "react";
import {Modal, ModalFooter} from "react-bootstrap";

interface ModalProps {
    children?: React.ReactNode,
    footer?: React.ReactNode,
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
            {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
        </Modal>
    )
}