import React, {useEffect, useState} from 'react';
import {Button, Col, Card, Container, Form, Row, Collapse} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";
import CellService from "../service/cell-service";
import CellTypeFormControl from "../components/forms/CellTypeFormControl";
import {ITypeValue} from "../models/ITypeValue";
import {ICellType} from "../models/ICellType";
import NumberFormControl from "../components/forms/NumberFormControl";
import StringFormControl from "../components/forms/StringFormControl";

function NewGamePage() {

    const isSignedIn = AuthService.isSignedIn()
    const [cellMax, setCellMax] = useState(10)

    const [created, setCreated] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");

    const [title, setTitle] = useState("My new game")
    const [titleValid, setTitleValid] = useState(true)

    const [cellNumber, setCellNumber] = useState(10)

    const [grayZoneNumber, setGrayZoneNumber] = useState(0)

    const [isShared, setIsShared] = useState(true)

    const [hasSharedCell, setHasSharedCell] = useState(false)

    const [playersNumber, setPlayersNumber] = useState(1)

    const [typeValues, setTypeValues] = useState<ITypeValue[]>([])
    const [vtValid, setVtValid] = useState(true)
    const [vtLocalInvalid, setVtLocalInvalid] = useState(true)

    async function fetchTypes() {
        let cellsMax = await CellService.getTypesCount().then(result => {
            return result
        })
        let cellTypeArray = await CellService.getCellTypes().then(result => {
            return result
        })
        setCellMax(cellsMax)
        if (cellsMax < 10) {
            setCellNumber(cellsMax)
            initTypeValues(cellTypeArray, cellsMax)
        } else {
            initTypeValues(cellTypeArray, 10)
        }
    }

    function initTypeValues(cellTypeArray: ICellType[], max: number) {
        cellTypeArray.forEach(cellType => {
            if (cellType.id === 1) {
                pushToTypeValues({"value": max, "type": cellType})
            } else {
                pushToTypeValues({"value": 0, "type": cellType})
            }
        })
    }

    function pushToTypeValues(newElement: ITypeValue) {
        setTypeValues(prevTypeValues => [...prevTypeValues, newElement]);
    }

    useEffect(() => {
        fetchTypes()
    }, [])

    useEffect(() => {
        if (cellNumber < grayZoneNumber) {
            setGrayZoneNumber(cellNumber)
        }
        setTypeValues(typeValues.map(typeValue => typeValue.value && cellNumber < typeValue.value
            ? {...typeValue, value: cellNumber} : {...typeValue}
        ))
    }, [cellNumber])

    useEffect(() => {
        let sum = typeValues.map(typeValue => typeValue.value ? typeValue.value : 0)
            .reduce((prev, curr) => prev + curr, 0)
        if (sum !== cellNumber) {
            setVtValid(false)
        } else {
            setVtValid(true)
        }
    }, [typeValues])

    function handleSharedToggle() {
        if (!isShared) {
            setHasSharedCell(false);
        }
        setIsShared(!isShared)
    }

    function handleChangeTypeValue(cellType: ICellType, value: number) {
        setTypeValues(typeValues.map(typeValue => typeValue.type.id === cellType.id
            ? {...typeValue, value: value} : {...typeValue}))
    }

    function handleTitleChange(value: string) {
        setTitle(value)
        if (value.length === 0) {
            setTitleValid(false)
        } else {
            setTitleValid(true)
        }
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
        return <Navigate to="/login"/>
    }

    if (created) {
        return <Navigate to="/rolls"/>
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
                                            <hr/>
                                            {errorMsg.length !== 0 && <p>{errorMsg}</p>}
                                            <StringFormControl label={"Name"} value={title} isLarge={true}
                                                               valid={titleValid} setValue={handleTitleChange} />
                                            <NumberFormControl label={"Number of cells"} value={cellNumber}
                                                               min={1} max={cellMax} isSmall={false}
                                                               valid={true} setValue={setCellNumber}
                                                               disableButton={setVtLocalInvalid} />
                                            {typeValues.map(typeValue =>
                                                <CellTypeFormControl cellType={typeValue.type} value={typeValue.value}
                                                                     max={cellNumber} setValue={handleChangeTypeValue}
                                                                     valid={vtValid} disableButton={setVtLocalInvalid}
                                                                     key={typeValue.type.id}/>)}
                                            <NumberFormControl label={"Gray zone"} value={grayZoneNumber}
                                                               min={0} max={cellNumber} isSmall={true}
                                                               valid={true} setValue={setGrayZoneNumber}
                                                               disableButton={setVtLocalInvalid}/>
                                            <Form.Group className="mb-3 mt-3 ng-group">
                                                <Form.Label className={"ng-label ng-label-md"}>Shared grid</Form.Label>
                                                <div className={"ng-control-container"}>
                                                    <Form.Switch id="shared-check" aria-label="shared"
                                                                 checked={isShared}
                                                                 className={"ng-control ng-control-switch"}
                                                                 onChange={() => handleSharedToggle()}/>
                                                </div>
                                            </Form.Group>
                                            <Collapse in={!isShared}>
                                                <div>
                                                    <Form.Group className="mb-3 ng-group">
                                                        <Form.Label className={"ng-label ng-label-sm"}>Has shared
                                                            cell</Form.Label>
                                                        <div className={"ng-control-container"}>
                                                            <Form.Switch id="shared-check" aria-label="shared"
                                                                         checked={hasSharedCell}
                                                                         className={"ng-control ng-control-switch-sm"}
                                                                         onChange={() => setHasSharedCell(!hasSharedCell)}/>
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </Collapse>
                                            <NumberFormControl label={"Number of players"} value={playersNumber}
                                                               min={1} isSmall={false}
                                                               valid={true} setValue={setPlayersNumber}
                                                               disableButton={setVtLocalInvalid}/>
                                        </Row>
                                        <Row sm={3} className={"mt-3 mb-3 ng-row ng-button-row"}>
                                            <Button disabled={!titleValid || !vtValid || vtLocalInvalid}>Create</Button>
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
