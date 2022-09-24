import React, {useState} from "react";
import logo from "../logo.svg";
import {ModalScreen} from "../components/ModalScreen";
import {Button} from "react-bootstrap";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";

export function AddCellsPage() {

    const [isSignedIn, setSignedIn] = useState(AuthService.isSignedIn)

    const [modalShow, setModalShow] = useState(false);

    if (!isSignedIn) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="container mx-auto max-w-2xl pt-5">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Launch vertically centered modal ({modalShow ? "True" : "False"})
                        </Button>
                    </div>
                </header>
            </div>

            <ModalScreen isOpen={modalShow} title={"New Modal"} onHide={() => setModalShow(false)} children={<p>New Modal Screen</p>}/>
        </>
    )
}