import { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import Product from './Product';

import { ProductType } from '../types';
import { listDisplayLength } from '../utils/constants';

import '../css/productlist.css';

function toProduct(product: ProductType, index: number) {
    return (
        <div key={index}>
            <Product product={product} />
        </div>
    );
}

interface Props {
    products: ProductType[];
    loadMore: () => void;
    hasMore: boolean;
}

const ProductList: React.FC<Props> = ({products, loadMore, hasMore}) => {
    return (
        <div className='list'>
            <InfiniteScroll
                dataLength={products.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<div>Loading...</div>}
            >
                {products.map(toProduct)}
            </InfiniteScroll>
        </div>
    );
}

export default ProductList;
