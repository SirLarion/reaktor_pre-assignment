import { act, render, fireEvent } from '@testing-library/react';

import CategoryContainer from '../components/CategoryContainer';

import * as Tools from '../utils/tools';

// Mock ProductList as it makes API calls
jest.mock('../components/ProductList');

// Mock scrollPageToTop as jest doesn't recognize 'window' object
jest.spyOn(Tools, 'scrollPageToTop').mockImplementation();

describe('<CategoryContainer>', () => {
    it('should have the correct base class', () => {
        const { container } = render(<CategoryContainer />);
        expect(container.firstChild).toHaveClass('categories');
    });

    it('should have one active category "Gloves" by default', () => {
        const { getByText } = render(<CategoryContainer />);
        expect(getByText('Gloves')).toHaveClass('button--active');
        expect(getByText('Facemasks')).not.toHaveClass('button--active');
        expect(getByText('Beanies')).not.toHaveClass('button--active');
    });

    it('should switch to category "Facemasks" when the corresponding nav button is clicked', () => {
        const { getByText } = render(<CategoryContainer />);
        act(() => {
            fireEvent.click(getByText('Facemasks'));
        });
        expect(getByText('Facemasks')).toHaveClass('button--active');
        expect(getByText('Gloves')).not.toHaveClass('button--active');
        expect(getByText('Beanies')).not.toHaveClass('button--active');
    });

    it('should switch to category "Beanies" when the corresponding nav button is clicked', () => {
        const { getByText } = render(<CategoryContainer />);
        act(() => {
            fireEvent.click(getByText('Beanies'));
        });
        expect(getByText('Beanies')).toHaveClass('button--active');
        expect(getByText('Gloves')).not.toHaveClass('button--active');
        expect(getByText('Facemasks')).not.toHaveClass('button--active');
    });

    it('should switch back to category "Gloves" when the corresponding nav button is clicked after switching to another category', () => {
        const { getByText } = render(<CategoryContainer />);
        act(() => {
            fireEvent.click(getByText('Beanies'));
        });
        act(() => {
            fireEvent.click(getByText('Gloves'));
        });
        expect(getByText('Gloves')).toHaveClass('button--active');
        expect(getByText('Facemasks')).not.toHaveClass('button--active');
        expect(getByText('Beanies')).not.toHaveClass('button--active');
    });

    it('should not switch category when the nav button of the active category is clicked', () => {
        const { getByText } = render(<CategoryContainer />);
        act(() => {
            fireEvent.click(getByText('Gloves'));
        });
        expect(getByText('Gloves')).toHaveClass('button--active');
        expect(getByText('Facemasks')).not.toHaveClass('button--active');
        expect(getByText('Beanies')).not.toHaveClass('button--active');
    });
});
