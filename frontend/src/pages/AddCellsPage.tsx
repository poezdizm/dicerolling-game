import React, {useState} from "react";
import {ModalScreen} from "../components/ModalScreen";
import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";
import {useCells} from "../service/hooks/use-cells";
import CellListItem from "../components/CellListItem";

export function AddCellsPage() {

    const isSignedIn = AuthService.isSignedIn

    const [modalShow, setModalShow] = useState(false);

    const {cells} = useCells();

    if (!isSignedIn) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Container>
                        <Row>
                            <Col sm={1} />
                            <Col sm={7}>
                                <Button variant="primary" onClick={() => setModalShow(true)}>
                                    Launch vertically centered modal ({modalShow ? "True" : "False"})
                                </Button>
                                <Card className="mt-4">
                                    <Card.Body>
                                        <ListGroup>
                                            {cells.map(cell => <CellListItem cell={cell} key={cell.id} />)}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                    </Container>
                </header>
            </div>

            <ModalScreen isOpen={modalShow} title={"New Modal"} onHide={() => setModalShow(false)} children={<p>New Modal Screen</p>}/>
        </>
    )
}