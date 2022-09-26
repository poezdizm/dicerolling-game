import http from "../http-common";
import {authHeader} from "./hooks/auth-header";
import {ISettings} from "../models/ISettings";

const saveSettings = (settings: ISettings) => {
    return http.post("/settings", settings, {headers: authHeader()})
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response.data.message
        });
}

const SettingsService = {
    saveSettings
};

export default SettingsService;