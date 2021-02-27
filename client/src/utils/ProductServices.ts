import axios from 'axios';

const server = 'http://localhost:3001';

// Send Axios GET request to API gateway server
export const getCategoryFromAPI = (category: string, start: number, end: number) => {
    const url = `${server}/${category}/${start}/${end}`;
    return axios.get(url);
}


