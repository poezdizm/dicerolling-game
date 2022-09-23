import React, {useState} from "react";
import axios from "axios";

export function RegisterPage() {

    const [isSignedUp, setSignedUp] = useState("")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    async function register() {
        await axios.post("http://localhost:8080/reg", {"username": username, "password": password, "confirm": confirm})
            .then(res => {
                if (res.status === 200) {
                    setSignedUp(res.data); // after signing up, set the state to true. This will trigger a re-render
                }
            })
    }

    return (
        <div>
            <form>
                <input type={"text"} onChange={event => setUsername(event.target.value)}/>
                <input type={"password"} onChange={event => setPassword(event.target.value)}/>
                <input type={"password"} onChange={event => setConfirm(event.target.value)}/>
                <button disabled={username.length === 0 || password.length === 0} onClick={() => {
                    register()
                }}></button>
            </form>
            <p>{isSignedUp}</p>
        </div>
    )
}