import {StompHeaders} from "react-stomp";

export function authHeaderStomp() : typeof StompHeaders {

    const user = JSON.parse(localStorage.getItem("user") || '{}');

    return user && user.token ? { "Authorization": "Bearer " + user.token } : {};
}