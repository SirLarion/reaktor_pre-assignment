import { ProductType } from '../types';

function parseAvailability(raw: string | undefined): string {
    let availability = 'error: 404';
    if(raw) {
        const start = raw.indexOf('<INSTOCKVALUE>') +14;
        const end = raw.indexOf('</INSTOCKVALUE>')
        availability = raw.slice(start, end);
    }
    return availability;
}

const Product: React.FC<{product: ProductType}> = ({product}) => {
    const nameRaw: string = product.name;
    const availability = parseAvailability(product.availability);
    return (
        <div className='product'>
            <div className='product__attribute'>
                {nameRaw[0] + nameRaw.substring(1).toLowerCase()}
            </div>
            <div className='product__attribute'>
                {product.id}
            </div>
            <div className='product__attribute'>
                {product.color.join(', ')}
            </div>
            <div className='product__attribute'>
                {product.price}
            </div>
            <div className='product__attribute'>
                {product.manufacturer}
            </div>
            <div className='product__attribute'>
                {availability}
            </div>
        </div>
    );
}

export default Product;
