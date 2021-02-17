import axios from 'axios';

const baseURL = 'https://bad-api-assignment.reaktor.com/v2';
const local = 'http://localhost:3001';

export const getCategoryFromAPI = (category: string) => {
    const url = `${local}/${category}`;
    console.log(`Sending GET to ${url}`);
    const req = axios.get(url);
    return req.then(res => res.data); 
}

export const initialAPIcall = (categories: string[]) => {
    const responses = categories.map(c => {
        const url = `${local}/${c.toLowerCase()}/initial`;
        return axios.get(url);
    });
    return responses[0].then(res => res.data);
}
