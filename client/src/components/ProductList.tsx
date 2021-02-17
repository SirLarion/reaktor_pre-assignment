import InfiniteScroll from 'react-infinite-scroller';

import Product from './Product';
import { ProductType } from '../types';

import '../css/productlist.css';

function toProduct(product: ProductType, index: number) {
    return (
        <div key={index}>
            <Product product={product} />
        </div>
    );
}

const ProductList: React.FC<{products: ProductType[]}> = ({products}) => {
    return (
        <div className='list'>
            {products.map(toProduct)}
        </div>
    );
}

export default ProductList;
