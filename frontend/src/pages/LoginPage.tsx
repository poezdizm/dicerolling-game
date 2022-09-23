import React, {useState} from "react";
import axios from "axios";

export function LoginPage() {

    const [isSignedUp, setSignedUp] = useState("")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function register() {
        await axios.post("http://localhost:8080/login", {"username": username, "password": password})
            .then(res => {
                if (res.status === 200) {
                    setSignedUp(res.data);
                    localStorage.setItem('user', res.data)
                }
            })
    }

    return (
        <div>
            <form>
                <input type={"text"} onChange={event => setUsername(event.target.value)}/>
                <input type={"password"} onChange={event => setPassword(event.target.value)}/>
                <button type={"submit"} disabled={username.length === 0 || password.length === 0} onClick={event => {
                    event.preventDefault()
                    register()
                }}></button>
            </form>
            <p>{isSignedUp}</p>
        </div>
    )
}