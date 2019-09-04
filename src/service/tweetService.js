import base from '../config/base';

class Tweet {
    static get(apiEndpoint) {
        return base.get(apiEndpoint)
            .then((response) => {
                console.log(response.data)
                return response;
            }).catch((err) => {
                throw err;
            });
    }
}

export default Tweet;
