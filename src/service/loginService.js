import base from '../config/base';

class Login {
    static logar(apiEndpoint, payload) {
        return base.post(apiEndpoint, JSON.stringify(payload))
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                return response;
            }).catch((err) => {
                throw err;
            });
    }
}

export default Login;
