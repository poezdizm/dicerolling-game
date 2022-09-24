import React, {useContext, useState} from "react";
import AuthService from "../service/auth-service";

export function LoginPage() {

    const [isSignedIn, setSignedIn] = useState(false)
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
            {isSignedIn && <p>User signed in successfully!</p>}
            {error && <p>Credentials are incorrect</p>}
        </div>
    )
}