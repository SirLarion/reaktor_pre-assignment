import { render, screen } from '@testing-library/react';

import Product from '../components/Product';
import { ProductType } from '../types';

describe('<Product>', () => {
    it('should have the correct base class', () => {
        const testProduct: ProductType = {
            id: '123',
            type: 'gloves',
            name: 'Pair of Gloves',
            color: ['black', 'white'],
            price: 45,
            manufacturer: 'glove inc',
            availability: '<AVAILABILITY>  <CODE>200</CODE>  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE></AVAILABILITY>'
        }
        const { container } = render(<Product product={testProduct} />);
        expect(container.firstChild).toHaveClass('product');
    });

    it('should have the correct id', () => {
        const testProduct: ProductType = {
            id: '123',
            type: '',
            name: '',
            color: [''],
            price: 0,
            manufacturer: ''
        }
        render(<Product product={testProduct} />);
        expect(screen.getByText(testProduct.id)).toHaveClass('product__attribute');
    });

    it('should have the correct name', () => {
        const testProduct: ProductType = {
            id: '',
            type: '',
            name: 'PAIR OF GLOVES',
            color: [''],
            price: 0,
            manufacturer: ''
        }
        render(<Product product={testProduct} />);
        expect(screen.getByText('Pair of gloves')).toHaveClass('product__attribute');
    });

    it('should have the correct color', () => {
        const testProduct: ProductType = {
            id: '',
            type: '',
            name: '',
            color: ['black', 'white'],
            price: 0,
            manufacturer: ''
        }
        render(<Product product={testProduct} />);
        expect(screen.getByText(testProduct.color.join(', '))).toHaveClass('product__attribute');
    });

    it('should have the correct price', () => {
        const testProduct: ProductType = {
            id: '',
            type: '',
            name: '',
            color: [''],
            price: 45,
            manufacturer: ''
        }
        render(<Product product={testProduct} />);
        expect(screen.getByText(testProduct.price)).toHaveClass('product__attribute');
    });

    it('should have the correct manufacturer', () => {
        const testProduct: ProductType = {
            id: '',
            type: '',
            name: '',
            color: [''],
            price: 0,
            manufacturer: 'glove inc'
        }
        render(<Product product={testProduct} />);
        expect(screen.getByText(testProduct.manufacturer)).toHaveClass('product__attribute');
    });

    it('should work with undefined availability', () => {
        const testProduct: ProductType = {
            id: '',
            type: '',
            name: '',
            color: [''],
            price: 0,
            manufacturer: ''
        }
        render(<Product product={testProduct} />);
        expect(screen.getByText('error: 404')).toHaveClass('product__attribute');
    });

    it('should work with defined availability', () => {
        const testProduct: ProductType = {
            id: '',
            type: '',
            name: '',
            color: [''],
            price: 0,
            manufacturer: '',
            availability: '<AVAILABILITY>  <CODE>200</CODE>  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE></AVAILABILITY>'
        }
        render(<Product product={testProduct} />);
        expect(screen.getByText('INSTOCK')).toHaveClass('product__attribute');
    });
});
