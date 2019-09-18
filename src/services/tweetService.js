import base from '../config/base';

class Tweet {
    static getTweet({ apiEndpoint, page }) {
        return base.get(`${apiEndpoint}?page=${page}`)
            .then((response) => {
                return response;
            }).catch((err) => {
                throw err;
            });
    }

    static setTweet({ apiEndpoint, payload }) {
        return base.post(apiEndpoint, JSON.stringify(payload))
            .then((response) => {
                return response;
            }).catch((err) => {
                throw err;
            });
    }
    
    static delTweet(apiEndpoint, id) {
        return base.delete(`${apiEndpoint}/${id}`)
        .then((response) => {
            return response;
        }).catch((err) => {
            throw err;
        });
    }
}

export default Tweet;
