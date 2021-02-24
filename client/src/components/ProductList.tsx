import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Product from './Product';

import { showModal, hideModal } from '../utils/modal';
import { getCategoryFromAPI, getErrorMessage } from '../utils/ProductServices';
import { listDisplayLength } from '../utils/constants';

import { ProductType } from '../types';

// Helper; gets items from the API of category 'categoryName' starting from 'start'
function getCategoryItems(categoryName: string, start: number) {
    return getCategoryFromAPI(categoryName, start, start+listDisplayLength);
}

// Helper; easy mapping of ProductType to Product component
function toProduct(product: ProductType, index: number) {
    return (
        <div key={index}>
            <Product product={product} />
        </div>
    );
}

//===================================================================/
/*
 * The list of products currently in display. Products are of type 'activeCategory'
 * as defined by CategoryContainer. 
 *
 * ProductList handles calls to the gateway API
 * server so only ProductList has to be reloaded whenever the list of products 
 * changes.
 */
const ProductList: React.FC<{activeCategory: string}> = ({activeCategory}) => {

    const initialProducts: ProductType[] = [];

    // Maintains an error message displayed inside the component
    // based on API responses
    const [errorMessage, setError] = useState('');

    // The category of the products currently displayed
    const [productsCategory, setCategory] = useState(activeCategory);

    // All the products that are currently kept in memory on the client
    // 100 products from the active category by default, more if the list
    // is scrolled further down
    const [products, setProducts] = useState(initialProducts);
    const [hasProducts, setHasProducts] = useState(true);


    const loadMoreProducts = (): void => {
        getCategoryItems(productsCategory.toLowerCase(), products.length)
            .then(res => {
                if(res.status === 200) {
                    setProducts(products.concat(res.data));
                }
                else if(res.status === 204) {
                    setHasProducts(false);
                }
            })
            .catch(err => setError(getErrorMessage(err.status)));
    }

    // Attempt to load the initial products 
    useEffect(() => {
        setError('');
        showModal();

        getCategoryItems(activeCategory, 0)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                setError(getErrorMessage(err.response.status));
            })
            .finally(hideModal);
    }, []);

    // Check if activeCategory has been changed. If it has, load new list
    // of products
    if(productsCategory !== activeCategory) {
        setError('');
        showModal();
        setCategory(activeCategory);

        getCategoryItems(activeCategory, 0)
            .then(res => {
                setHasProducts(true);
                setProducts(res.data);
            })
            .catch(err => {
                setHasProducts(false);
                setProducts(initialProducts);
                setError(getErrorMessage(err.response.status));
            })
            .finally(hideModal);
    }

    // Display error instead of empty list if loading products failed
    if(errorMessage !== '') {
        return (
            <div className='list__body'>
                <div className='list--error'>
                    { errorMessage }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='list__body'>
                <InfiniteScroll
                    dataLength={products.length}
                    next={loadMoreProducts}
                    hasMore={hasProducts}
                    loader={<div></div>}
                    scrollThreshold={0.5}
                >
                    {products.map(toProduct)}
                </InfiniteScroll>
            </div>
        );
    }
}

//===================================================================/
// ProductList end

export default ProductList;
