import http from "../http-common";

const login = (username: string, password: string) => {
    return http.post("/auth/signin", {username, password})
        .then(response => {
            if (response.status === 200) {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
            }
            window.location.reload();
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
    }).then(response => {
        return response.data
    }).catch(function (error) {
        return ""
    });
}

const isSignedIn = () => {
    let user = JSON.parse(localStorage.getItem("user") || '{}');
    return user && user.token;
}


const AuthService = {
    login,
    logout,
    register,
    isSignedIn
};

export default AuthService;