import axios from 'axios';

const baseURL = 'https://bad-api-assignment.reaktor.com/v2';
const local = 'http://localhost:3001';

export const getCategory = (category: string) => {
    const url = `${local}/${category}`;
    console.log(`Sending GET to ${url}`);
    const req = axios.get(url);
    return req.then(res => res.data); 
}

export const getAvailability = (manufacturer: string) => {
    const req = axios.get(`${baseURL}/availability/${manufacturer}`);
    return req.then(res => res.data);
}
