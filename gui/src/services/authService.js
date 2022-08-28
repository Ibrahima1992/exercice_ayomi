import axios from 'axios'

const login = (value) => {
    var axios = require('axios');
    var data = '';
    var config = {
        method: 'post',
        url: `http://localhost:8000/test-ayomi/login/${value.login}/${value.password}`,
        headers: {},
        data: data
    };

    axios(config)
        .then(function (response) {
            localStorage.setItem("user", JSON.stringify(response.data))
        })
        .catch(function (error) {
            console.log(error);
        });

}

const emailEdit = (id, email) => {
    var data = JSON.stringify({
        "email": email
    });

    var config = {
        method: 'put',
        url: `http://localhost:8000/test-ayomi/users/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {

        })
        .catch(function (error) {
            console.log(error);
        });
}



const logout = () => {
    localStorage.removeItem("user");
    window.location.reload()
}

const AuthService = { login, logout, emailEdit }
export default AuthService