import React, {useEffect, useState} from 'react';
import {Button, Col, Card, Container, Form, Row, Collapse} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";
import CellService from "../service/cell-service";

function NewGamePage() {

    const isSignedIn = AuthService.isSignedIn()
    const [cellMax, setCellMax] = useState(1)

    const [created, setCreated] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");

    const [title, setTitle] = useState("")
    const [cellNumber, setCellNumber] = useState(10)
    const [grayZoneNumber, setGrayZoneNumber] = useState(0)
    const [isShared, setIsShared] = useState(true)
    const [hasSharedCell, setHasSharedCell] = useState(false)
    const [playersNumber, setPlayersNumber] = useState(0)

    async function fetchTypesCount() {
        let cellsMax = await CellService.getTypesCount().then(result => {
            return result
        })
        setCellMax(cellsMax)
        if (cellsMax < 10) {
            setCellNumber(cellsMax)
        }
    }

    useEffect(() => {
        fetchTypesCount()
    }, [])

    useEffect(() => {
        if (cellNumber < grayZoneNumber) {
            setGrayZoneNumber(cellNumber)
        }
    }, [cellNumber])

    function handleSharedToggle() {
        if (!isShared) {
            setHasSharedCell(false);
        }
        setIsShared(!isShared)
    }

    /*
    function handleAdd() {
        SettingsService.saveSettings({"title": title, })
            .then(response => {
                if (response.status === 200) {
                    setCreated(true)
                } else {
                    setErrorMsg(response)
                }
            });
    }*/

    if (!isSignedIn) {
        return <Navigate to="/login" />
    }

    if (created) {
        return <Navigate to="/rolls" />
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Container className="basic-container">
                        <Row>
                            <Col sm={1}/>
                            <Col sm={7}>
                                <Card className="mt-4">
                                    <Form>
                                        <Row className={"ng-row"}>
                                            <h2 className={"ng-heading"}>Create new game</h2>
                                            <hr />
                                            {errorMsg.length !== 0 && <p>{errorMsg}</p>}
                                            <Form.Group className="mb-3 mt-3 ng-group">
                                                <Form.Label className={"ng-label"}>Name</Form.Label>
                                                <div className={"ng-control-container"}>
                                                    <Form.Control size="lg" type="text" value={title}
                                                                  className={"ng-control ng-control-lg"}
                                                                  onChange={event => setTitle(event.target.value)}>
                                                    </Form.Control>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3 mt-3 ng-group">
                                                <Form.Label className={"ng-label ng-label-md"}>Number of cells</Form.Label>
                                                <div className={"ng-control-container"}>
                                                    <Form.Control type="number" min="1" max={cellMax} value={cellNumber}
                                                                  className={"ng-control ng-control-sm"}
                                                                  onChange={event => setCellNumber(parseInt(event.target.value))}>
                                                    </Form.Control>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3 mt-3 ng-group">
                                                <Form.Label className={"ng-label ng-label-sm"}>Gray zone</Form.Label>
                                                <div className={"ng-control-container"}>
                                                    <Form.Control type="number" min="0" max={cellNumber}
                                                                  value={grayZoneNumber} className={"ng-control ng-control-sm"}
                                                                  onChange={event => setGrayZoneNumber(parseInt(event.target.value))}>
                                                    </Form.Control>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3 mt-3 ng-group">
                                                <Form.Label className={"ng-label ng-label-md"}>Shared grid</Form.Label>
                                                <div className={"ng-control-container"}>
                                                    <Form.Switch id="shared-check" aria-label="shared"
                                                                 checked={isShared}
                                                                 className={"ng-control ng-control-switch"}
                                                                 onChange={() => handleSharedToggle()} />
                                                </div>
                                            </Form.Group>
                                            <Collapse in={!isShared}>
                                                <div>
                                                    <Form.Group className="mb-3 ng-group">
                                                        <Form.Label className={"ng-label ng-label-sm"}>Has shared cell</Form.Label>
                                                        <div className={"ng-control-container"}>
                                                            <Form.Switch id="shared-check" aria-label="shared"
                                                                         checked={hasSharedCell}
                                                                         className={"ng-control ng-control-switch-sm"}
                                                                         onChange={() => setHasSharedCell(!hasSharedCell)} />
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </Collapse>
                                            <Form.Group className="mb-3 mt-3 ng-group">
                                                <Form.Label className={"ng-label ng-label-md"}>Number of players</Form.Label>
                                                <div className={"ng-control-container"}>
                                                    <Form.Control type="number" min="0" max={cellNumber}
                                                                  value={playersNumber} className={"ng-control ng-control-sm"}
                                                                  onChange={event => setPlayersNumber(parseInt(event.target.value))}>
                                                    </Form.Control>
                                                </div>
                                            </Form.Group>
                                        </Row>
                                        <Row sm={3} className={"mt-3 mb-3 ng-row ng-button-row"}>
                                            <Button disabled={title.length === 0}>Create</Button>
                                        </Row>
                                    </Form>
                                </Card>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                    </Container>
                </header>
            </div>
        </>
    )
}

export default NewGamePage;
