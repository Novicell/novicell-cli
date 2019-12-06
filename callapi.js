const axios = require('axios');

axios.get(process.env.API_URL + '/api/content').then(x => console.log(x.data));
