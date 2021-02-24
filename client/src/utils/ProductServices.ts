import axios from 'axios';

const local = 'http://localhost:3001';

// Send Axios GET request to API gateway server
export const getCategoryFromAPI = (category: string, start: number, end: number) => {
    const url = `${local}/${category}/${start}/${end}`;
    return axios.get(url);
}

// Return an error message depending on what status code the
// error in question has. If there's no status code, the gateway
// server is offline
export const getErrorMessage = (code: number | undefined): string => {
    let message = '';
    if(code) message = `Connecting to server failed: ${code}`;
    else message = 'API gateway server offline';

    return message;
}
