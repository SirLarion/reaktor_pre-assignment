import { ProductType } from '../types';

const Product: React.FC<{product: ProductType}> = ({product}) => {
    const nameRaw: string = product.name;
    return (
        <div className='product'>
            {nameRaw[0] + nameRaw.substring(1).toLowerCase()}
        </div>
    );
}

export default Product;
