import axios from 'axios';

const local = 'http://192.168.1.61:3001';

export const getCategoryFromAPI = (category: string, start: number, end: number) => {
    const url = `${local}/${category}/${start}/${end}`;

    console.log(`Sending GET to ${url}`);
    const req = axios.get(url);

    return req; 
}

export const getErrorMessage = (code: number | undefined): string => {
    if(code) {
        return `Connecting to server failed: ${code}`;
    }
    else return 'API gateway server offline';
}
