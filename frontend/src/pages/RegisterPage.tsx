import React, {useState} from "react";
import AuthService from "../service/auth-service";

export function RegisterPage() {

    const [isSignedUp, setSignedUp] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    async function register() {
        await AuthService.register(username, password).then(
            result => {
                if (result !== "") {
                    setSignedUp(true)
                }
            }
        )
    }

    return (
        <div>
            <form>
                <input type={"text"} onChange={event => setUsername(event.target.value)}/>
                <input type={"password"} onChange={event => setPassword(event.target.value)}/>
                <input type={"password"} onChange={event => setConfirm(event.target.value)}/>
                <button disabled={username.length === 0 || password.length === 0 || password !== confirm}
                        onClick={() => {register()}}></button>
            </form>
            {isSignedUp && <p>User registered successfully!</p>}
        </div>
    )
}