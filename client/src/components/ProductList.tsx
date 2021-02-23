import InfiniteScroll from 'react-infinite-scroll-component';

import Product from './Product';
import { ProductType } from '../types';


interface Props {
    products: ProductType[];
    loadMore: () => void;
    hasMore: boolean;
    error: string;
}

function toProduct(product: ProductType, index: number) {
    return (
        <div key={index}>
            <Product product={product} />
        </div>
    );
}

const ProductList: React.FC<Props> = ({products, loadMore, hasMore, error}) => {
    if(error !== '') {
        return (
            <div className='list__body'>
                <div className='list--error'>
                    { error }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='list__body'>
                <InfiniteScroll
                    dataLength={products.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<div></div>}
                    scrollThreshold={0.5}
                >
                    {products.map(toProduct)}
                </InfiniteScroll>
            </div>
        );
    }
}

export default ProductList;
