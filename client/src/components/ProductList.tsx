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
    const headerItems = ['Name', 'ID', 'Colors', 'Price', 'Manufacturer', 'Availability'];
    return (
        <div className='list'>
            <div className='list__header'>
                {
                    headerItems.map((item: string) => {
                        return (
                            <div className='list__attribute'>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
            <div className='list__body'>
                <InfiniteScroll
                    dataLength={products.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<div>Loading products...</div>}
                    scrollThreshold={0.5}
                >
                    {products.map(toProduct)}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default ProductList;
