import React, {useState} from "react";
import AuthService from "../service/auth-service";
import {Navigate} from "react-router-dom";

export function LoginPage() {

    const user = JSON.parse(localStorage.getItem("user") || '{}')
    const [isSignedIn, setSignedIn] = useState(user && user.token)
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
        return <Navigate to="/" />
    }

    return (
        <div>
            <form>
                <input type={"text"} onChange={event => setUsername(event.target.value)}/>
                <input type={"password"} onChange={event => setPassword(event.target.value)}/>
                <button type={"submit"} disabled={username.length === 0 || password.length === 0} onClick={event => {
                    event.preventDefault()
                    login()
                }}></button>
            </form>
            {error && <p>Credentials are incorrect</p>}
        </div>
    )
}