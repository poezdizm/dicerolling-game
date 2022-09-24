import {AxiosRequestHeaders} from "axios";

export function authHeader() : AxiosRequestHeaders {

    const user = JSON.parse(localStorage.getItem("user") || '{}');

    return user && user.token ? { Authorization: "Bearer " + user.token } : {};
}