import http from "../http-common";

const login = (username: string, password: string) => {
    return http.post("/auth/signin", {username, password})
        .then(response => {
            if (response.status === 200) {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
            }
            return response.data
        })
        .catch(function (error) {
            return ""
        });
}

const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
}

const register = (username: string, password: string) => {
    return http.post("/auth/signup", {
        username, password
    });
}


const AuthService = {
    login,
    logout,
    register
};

export default AuthService;