import { render, screen } from '@testing-library/react';

import CategoryNav from '../components/CategoryNav';

describe('<CategoryNav>', () => {
    it('should have the correct base class', () => {
        const handleClick = jest.fn();
        const { container } = render(<CategoryNav name={'Gloves'} handleClick={handleClick} />);
        expect(container.firstChild).toHaveClass('categories__button');
    });
});
