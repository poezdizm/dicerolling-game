import React, {useState} from "react";
import AuthService from "../service/auth-service";
import {Button, Card, Col, Container, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {Navigate} from "react-router-dom";

export function RegisterPage() {

    const [isSignedUp, setSignedUp] = useState(false)
    const [error, setError] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    async function register() {
        await AuthService.register(username, password).then(
            result => {
                console.log(result)
                if (result !== "") {
                    setSignedUp(true)
                } else {
                    setSignedUp(false)
                    setError(true)
                }
            }
        )
    }

    if (isSignedUp) {
        return <Navigate to="/login"/>
    }

    return (
        <div className="App">
            <header className="App-header">
                <Container className="basic-container">
                    <Row>
                        <Col sm={1}/>
                        <Col sm={7}>
                            <Card className={"login-card"}>
                                <Card.Header>
                                    <h2 className={"ng-heading"}>Sign up</h2>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <FormGroup>
                                            <Form.Label className={"login-label"}>Username</Form.Label>
                                            <FormControl type={"text"}
                                                         onChange={event => setUsername(event.target.value)}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label className={"login-label"}>Password</Form.Label>
                                            <FormControl type={"password"}
                                                         onChange={event => setPassword(event.target.value)}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label className={"login-label"}>Confirm password</Form.Label>
                                            <FormControl type={"password"}
                                                         onChange={event => setConfirm(event.target.value)}/>
                                        </FormGroup>
                                    </Form>
                                    {error && <p className={"login-error"}>User with this name already exists</p>}
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"}
                                            disabled={username.length === 0 || password.length === 0 || password !== confirm}
                                            onClick={() => {
                                                register()
                                            }}>Create new account</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={4}/>
                    </Row>
                </Container>
            </header>
        </div>
    )
}