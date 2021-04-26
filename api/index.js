const Axios = require('axios');

const server = Axios.create({
    baseURL: 'https://www.nhm.ac.uk/discover/dino-directory'
});

module.exports = server;
