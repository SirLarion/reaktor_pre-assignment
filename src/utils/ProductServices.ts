import axios from 'axios';

const config = {
    headers: {
        Origin: 'http://localhost:3000'
    }
}

const baseURL = 'https://bad-api-assignment.reaktor.com/v2';

export const getCategory = (category: string) => {
    const req = axios.get(`${baseURL}/products/${category}`, config);
    return req.then(res => res.data); 
}

export const getAvailability = (manufacturer: string) => {
    const req = axios.get(`${baseURL}/availability/${manufacturer}`, config);
    return req.then(res => res.data);
}
