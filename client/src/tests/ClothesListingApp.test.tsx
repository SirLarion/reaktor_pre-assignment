import React from 'react';
import { render, screen } from '@testing-library/react';

import ClothesListingApp from '../ClothesListingApp';

import { showModal, hideModal } from '../utils/tools';

// Mock ProductList as it makes API calls
jest.mock('../components/ProductList');

describe('<ClothesListingApp>', () => {
    it('should have the correct base class', () => {
        const { container } = render(<ClothesListingApp />);
        expect(container.firstChild).toHaveClass('app');
    });

    it('should display the logo', () => {
        const { getByAltText } = render(<ClothesListingApp />);
        expect(getByAltText('Clothes Brand')).toBeVisible();
    });

    it('should display "Storage" text', () => {
        const { getByText } = render(<ClothesListingApp />);
        expect(getByText('Storage')).toBeVisible();
    });

    it('should not display loader modal by default', () => {
        const { getByAltText } = render(<ClothesListingApp />);
        expect(getByAltText('Loading...')).not.toBeVisible();
    });

    it('should display loader modal when "showModal" is called', () => {
        const { getByAltText } = render(<ClothesListingApp />);
        showModal();
        expect(getByAltText('Loading...')).toBeVisible();
    });

    it('should not display loader modal after "hideModal" is called', () => {
        const { getByAltText } = render(<ClothesListingApp />);
        showModal();
        hideModal();
        expect(getByAltText('Loading...')).not.toBeVisible();
    });

});
