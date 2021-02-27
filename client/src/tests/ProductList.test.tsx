import { 
    act,
    screen,
    render, 
    waitFor
} from '@testing-library/react';

import ProductList from '../components/ProductList';
import { ProductType } from '../types';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from '../utils/__fixtures__/mockGloves.json';

describe('<ProductList>', () => {
    it('should have the correct base class on successful API call', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:3001/gloves/0/100').reply(200, mockData);
        const { container, getByText } = render(<ProductList activeCategory={'gloves'} />);

        // Wait until mock data has been loaded
        await waitFor(() => getByText('Kolem light'));

        expect(container.firstChild).toHaveClass('list__body');
    });

    it('should display an error message correctly on unsuccessful API call', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:3001/gloves/0/100').reply(404);
        const { getByText } = render(<ProductList activeCategory={'gloves'} />);

        // Wait until error has been caught 
        const error = await waitFor(() => getByText('Connecting to server failed: 404'));
        expect(error).toHaveClass('list--error');
    });

});
