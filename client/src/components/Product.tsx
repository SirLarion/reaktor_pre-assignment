import { ProductType } from '../types';

const Product: React.FC<{product: ProductType}> = ({product}) => {
    return (
        <div className='product'>
            {product.name}
        </div>
    );
}

export default Product;
