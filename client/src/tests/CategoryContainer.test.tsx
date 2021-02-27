import { render } from '@testing-library/react';

import CategoryContainer from '../components/CategoryContainer';
import ProductList from '../components/ProductList';

// Mock ProductList as it is tested separately
jest.mock("../components/ProductList", () => {
    return {
        __esModule: true,
        default: () => <div className='list'>List</div>
    }
});

describe('<CategoryContainer>', () => {
    it('should have the correct base class', () => {
        const { container } = render(<CategoryContainer />);
        expect(container.firstChild).toHaveClass('categories');
    });
});
