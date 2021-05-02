class FiledataService {

    getIp() {
        return fetch('https://jsonip.com').then(response => response.json());
    }

}

const filedataService = new FiledataService();

export default filedataService;