import React, {useState} from "react";
import AuthService from "../service/auth-service";
import {useNavigate} from "react-router-dom"

export function LoginPage() {

    const [error, setError] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    async function login() {
        await AuthService.login(username, password).then(
            result => {
                if (result !== "") {
                    navigate("/")
                } else {
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
            {error && <p>Credentials are incorrect</p>}
        </div>
    )
}