class Users {
    static getUsers = () => {
        try {
            return JSON.parse(localStorage.getItem("users")) || {};
        } catch (e) {
            return {}
        }
    }

    static setUser = (params) => {
        const users = this.getUsers();
        users[params.login] = {
            lastName: params.lastName,
            firstName: params.firstName,
            password: params.password,
        };
        localStorage.setItem("users", JSON.stringify(users));
    }
}