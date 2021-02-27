import { render } from '@testing-library/react';

import ListContainer from '../components/ListContainer';

describe('<ListContainer>', () => {
    it('should have the correct base class', () => {
        const { container } = render(<ListContainer />);
        expect(container.firstChild).toHaveClass('list');
    });
});
