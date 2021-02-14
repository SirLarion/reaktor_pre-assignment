import React from 'react';
import { render, screen } from '@testing-library/react';
import ClothesListingApp from '../ClothesListingApp';

describe('<ClothesListingApp> works correctly', () => {
    test('overall', () => {
        const { container } = render(<ClothesListingApp />);
        expect(container.firstChild).toHaveClass('app');
    });
});
