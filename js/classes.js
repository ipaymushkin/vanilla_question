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

    static updateUser = (login, params) => {
        const users = this.getUsers();
        users[login] = {
            ...users[login],
            ...params,
        }
        localStorage.setItem("users", JSON.stringify(users));
    }

    static deleteUser = (login) => {
        const users = this.getUsers();
        delete users[login];
        localStorage.setItem("users", JSON.stringify(users));
    }
}

class Games {
    static getGames = () => {
        try {
            return JSON.parse(localStorage.getItem("games")) || [];
        } catch (e) {
            return []
        }
    }

    static setGame = (params) => {
        const games = this.getGames();
        games.push(params);
        localStorage.setItem("games", JSON.stringify(games));
    }

    static deleteGame = (gameId) => {
        const games = this.getGames();
        const filteredGames = games.filter(el => el.id !== gameId);
        localStorage.setItem("games", JSON.stringify(filteredGames));
    }
}

class CurrentUser {
    static getUserLogin = () => {
        return localStorage.getItem("login");
    }

    static getCurrentUser = () => {
        const login = this.getUserLogin();
        const users = Users.getUsers();
        return users[login];
    }

    static setCurrentUser = (login) => {
        localStorage.setItem("login", login);
    }

    static clearCurrentUser = () => {
        localStorage.removeItem("login");
    }
}

class Statistics {
    static getStatistics = () => {
        try {
            return JSON.parse(localStorage.getItem("statistics")) || {};
        } catch (e) {
            return {};
        }
    }

    static setStatistics = (gameId, meta) => {
        const statistics = this.getStatistics();
        if (!statistics[gameId]) {
            statistics[gameId] = {};
        }
        const login = CurrentUser.getUserLogin();
        statistics[gameId] = {
            ...statistics[gameId],
            [login]: meta,
        }
        localStorage.setItem("statistics", JSON.stringify(statistics));
    }
}
