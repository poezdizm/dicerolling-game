import React, {useState} from "react";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";
import {Button, Card, Col, Container, Form, FormControl, FormGroup, Row} from "react-bootstrap";

export function LoginPage() {

    const [isSignedIn, setSignedIn] = useState(AuthService.isSignedIn)
    const [error, setError] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    async function login() {
        await AuthService.login(username, password).then(
            result => {
                if (result !== "") {
                    setError(false)
                    setSignedIn(true)
                } else {
                    setSignedIn(false)
                    setError(true)
                }
            }
        )
    }

    if (isSignedIn) {
        return <Navigate to="/"/>
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
                                    <h2 className={"ng-heading"}>Login</h2>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <FormGroup>
                                            <Form.Label className={"login-label"}>Username</Form.Label>
                                            <FormControl type={"text"} onChange={event => setUsername(event.target.value)}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label className={"login-label"}>Password</Form.Label>
                                            <FormControl type={"password"} onChange={event => setPassword(event.target.value)}/>
                                        </FormGroup>
                                    </Form>
                                    {error && <p className={"login-error"}>Credentials are incorrect</p>}
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"} disabled={username.length === 0 || password.length === 0}
                                            onClick={event => {
                                                event.preventDefault()
                                                login()
                                            }}>Sign in</Button>
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