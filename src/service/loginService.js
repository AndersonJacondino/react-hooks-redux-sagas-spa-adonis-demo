import base from '../config/base';

class Login {
    static post(apiEndpoint, payload) {
        return base.post(apiEndpoint, JSON.stringify(payload))
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.token);
                return response;
            }).catch((err) => {
                throw err;
            });
    }
}

export default Login;
