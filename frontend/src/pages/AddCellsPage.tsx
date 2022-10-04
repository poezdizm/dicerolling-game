import React, {ChangeEvent, createRef, useEffect, useState} from "react";
import {ModalScreen} from "../components/ModalScreen";
import {Button, Card, Col, Container, Form, FormGroup, ListGroup, Row} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";
import CellListItem from "../components/CellListItem";
import {useCellTypes} from "../service/hooks/use-cell-types";
import EditCellForm from "../components/forms/EditCellForm";
import {ICell} from "../models/ICell";
import CellService from "../service/cell-service";
import Utils from "../service/utils";
import {ICellPack} from "../models/ICellPack";
import AddPackForm from "../components/forms/AddPackForm";

export function AddCellsPage() {

    const isSignedIn = AuthService.isSignedIn()

    const [modalShow, setModalShow] = useState(false)
    const [confirmModalShow, setConfirmModalShow] = useState(false)
    const [packModalShow, setPackModalShow] = useState(false)
    const [currentCell, setCurrentCell] = useState<ICell>({id: 0})

    const [cells, setCells] = useState<ICell[]>([])
    const {cellTypes} = useCellTypes()

    const [query, setQuery] = useState("")
    const [cellsBuffer, setCellsBuffer] = useState<ICell[]>([])

    const [packs, setPacks] = useState<ICellPack[]>([])
    const [currentPack, setCurrentPack] = useState<ICellPack>({id: 1, title: "Default"})

    const listElem = createRef<HTMLDivElement>();

    async function fetchCells(packId: number) {
        let cellsNew = await CellService.getCells(packId).then(result => {
            return result
        })
        setCells(cellsNew)
        setCellsBuffer(cellsNew)
    }

    async function fetchPacks() {
        let packsNew = await CellService.getCellPacks().then(result => {
            return result
        })
        setPacks(packsNew)
    }

    async function deleteCell(cellId: number) {
        await CellService.deleteCell(cellId).then(() => fetchCells(currentPack.id));
    }

    function adjustListPadding() {
        if (listElem.current) {
            try {
                if (Utils.isOverflownY(listElem.current)) {
                    listElem.current.style.paddingRight = 10 + 'px'
                } else {
                    listElem.current.style.paddingRight = 0 + 'px'
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchPacks()
        fetchCells(currentPack.id)
    }, [])

    useEffect(() => {
        setCells(cellsBuffer.filter(cell => cell.content?.toLowerCase().includes(query.toLowerCase().trim())))
    }, [query])

    useEffect(() => {
        adjustListPadding()
    }, [cells])

    useEffect(() => {
        console.log(currentPack)
        fetchCells(currentPack.id)
    }, [currentPack])

    if (!isSignedIn) {
        return <Navigate to="/login"/>
    }

    function handleChange() {
        fetchCells(currentPack.id)
        setQuery("")
        setModalShow(false)
    }

    function handlePackChange() {
        fetchPacks()
        setPackModalShow(false)
    }

    function handleDelete(cellId: number) {
        deleteCell(cellId)
        setQuery("")
        setConfirmModalShow(false)
    }

    const openEditModal = (cell: ICell) => {
        setCurrentCell(cell)
        setModalShow(true)
    }

    const openDeleteModal = (cell: ICell) => {
        setCurrentCell(cell)
        setConfirmModalShow(true)
    }

    const handleRadioChange = (event: any, title: string) => {
        setCurrentPack({"id": parseInt(event.target.value), "title": title})
    }


    return (
        <>
            <div className="App">
                <header className="App-header">
                    <Container className="basic-container">
                        <Row>
                            <Col sm={1}/>
                            <Col sm={6}>
                                <Button variant="primary" onClick={() => {
                                    setCurrentCell({id: 0})
                                    setModalShow(true)
                                }}>
                                    + Add new Cell
                                </Button>
                                <Card className="mt-4">
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" placeholder="Type something to search"
                                                              value={query}
                                                              onChange={event => setQuery(event.target.value)}/>
                                            </Form.Group>
                                        </Form>
                                        <div className="cell-list" ref={listElem}>
                                            <ListGroup>
                                                {cells.map(cell => <CellListItem cell={cell} key={cell.id}
                                                                                 openEdit={openEditModal}
                                                                                 openDelete={openDeleteModal}/>)}
                                            </ListGroup>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={1}></Col>
                            <Col sm={3}>
                                <Button variant="primary" onClick={() => {
                                    setPackModalShow(true)
                                }}>
                                    + Add new Pack
                                </Button>
                                <Card className="mt-4 cell-pack-card">
                                    <Card.Body>
                                        <Form>
                                            {packs.map(pack =>
                                                <div key={pack.id}>
                                                    <FormGroup className={"cell-pack-group"}>
                                                        <Form.Check type={"radio"} name={"pack"} value={pack.id}
                                                                    checked={pack.id === currentPack.id}
                                                                    onChange={event => handleRadioChange(event, pack.title)}/>
                                                        <Form.Label className={"cell-pack-label"}>{pack.title}</Form.Label>
                                                    </FormGroup>
                                                </div>
                                            )}
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                    </Container>
                </header>
            </div>

            <ModalScreen isOpen={modalShow} title={currentCell.id === 0 ? "Add new Cell" : "Edit Cell"}
                         onHide={() => setModalShow(false)}
                         children={<EditCellForm cell={currentCell} cellTypes={cellTypes} currentPack={currentPack}
                                                 onHide={() => handleChange()}/>}/>

            <ModalScreen isOpen={confirmModalShow} title={"Delete Cell"}
                         onHide={() => setConfirmModalShow(false)}
                         children={<p>Are you sure you want to delete a cell?</p>}
                         footer={<Button variant={"danger"}
                                         onClick={() => handleDelete(currentCell.id)}>Confirm</Button>}/>

            <ModalScreen isOpen={packModalShow} title={"Add new Pack"}
                         onHide={() => setPackModalShow(false)}
                         children={<AddPackForm onHide={() => handlePackChange()} />}/>
        </>
    )
}