import React, {useEffect, useState} from "react";
import {ModalScreen} from "../components/ModalScreen";
import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";
import CellListItem from "../components/CellListItem";
import {useCellTypes} from "../service/hooks/use-cell-types";
import EditCellForm from "../components/EditCellForm";
import {ICell} from "../models/ICell";
import CellService from "../service/cell-service";

export function AddCellsPage() {

    const isSignedIn = AuthService.isSignedIn

    const [modalShow, setModalShow] = useState(false);
    const [currentCell, setCurrentCell] = useState<ICell>({id: 0});

    const [cells, setCells] = useState<ICell[]>([]);
    const {cellTypes} = useCellTypes();

    async function fetchCells() {
        let cellsNew = await CellService.getCells().then(result => {
            return result
        })
        setCells(cellsNew)
    }

    useEffect(() => {
        fetchCells()
    }, [])

    if (!isSignedIn) {
        return <Navigate to="/login" />
    }

    function handleChange() {
        fetchCells()
        setModalShow(false)
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Container className="basic-container">
                        <Row>
                            <Col sm={1} />
                            <Col sm={7}>
                                <Button variant="primary" onClick={() => {
                                    setCurrentCell({id: 0})
                                    setModalShow(true)
                                }}>
                                    + Add new Cell
                                </Button>
                                <Card className="mt-4 cell-list">
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

            <ModalScreen isOpen={modalShow} title={"Add new Cell"} onHide={() => setModalShow(false)}
                         children={<EditCellForm cell={currentCell} cellTypes={cellTypes} onHide={() => handleChange()} />}/>
        </>
    )
}