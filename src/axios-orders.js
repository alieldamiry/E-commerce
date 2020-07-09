import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://e-commerce-9417b.firebaseio.com/'
});

export default instance;