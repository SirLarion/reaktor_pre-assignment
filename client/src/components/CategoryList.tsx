import { useState, useEffect } from 'react';

import ProductList from './ProductList';
import CategoryNav from './CategoryNav';

import { getCategoryFromAPI } from '../utils/ProductServices';
import { ProductType, CategoryType } from '../types';
import { showModal, hideModal } from '../utils/modal';
import { listDisplayLength } from '../utils/constants';


import '../css/categorylist.css';


function getCategoryItems(categoryName: string, start: number) {
    return getCategoryFromAPI(categoryName, start, start+listDisplayLength);
}

const CategoryList: React.FC = () => {

    const categoryNames = ['Gloves', 'Facemasks', 'Beanies'];
    const initialProducts: ProductType[] = [];

    const [activeCategory, setCategory] = useState(categoryNames[0].toLowerCase());
    const [products, setProducts] = useState(initialProducts);
    const [hasProducts, setHasProducts] = useState(true);

    useEffect(() => {
        console.log('Loading products...');
        getCategoryItems(activeCategory, 0)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => setTimeout(loadMoreProducts, 10000));

        const initialActive = document.getElementById(categoryNames[0])
        if(initialActive) {
            initialActive.className = 'categories__button button--active';
        }
    }, []);

    const handleCategoryChange = (event: React.MouseEvent): void => {
        event.preventDefault();
        const targetName = event.currentTarget.textContent;
        if(targetName && activeCategory !== targetName) {
            showModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const list = document.getElementsByClassName('list__body')[0];
            // Change to empty product list before loading the new one
            //setProducts(initialProducts);

            document.getElementsByClassName('button--active')[0].className = 'categories__button';
            event.currentTarget.className = 'categories__button button--active';

            const targetLower = targetName.toLowerCase();
            setCategory(targetLower);
            
            getCategoryItems(targetLower, 0)
                .then(res => {
                    hideModal();
                    setHasProducts(true);
                    setProducts(res.data);
                })
                .catch(err => {
                    setHasProducts(false);
                });
        }
    }

    const loadMoreProducts = (): void => {
        getCategoryItems(activeCategory.toLowerCase(), products.length)
            .then(res => {
                if(res.status == 200) {
                    setProducts(products.concat(res.data));
                }
                else if(res.status == 204) {
                    setHasProducts(false);
                }
            })
            .catch(err => {
                setTimeout(loadMoreProducts, 10000);
            });
    }

    return (
        <div className='categories'>
            <div className='categories__wrapper'>
                <div className='categories__header'>
                    <div className='categories__nav'>
                        { 
                            categoryNames.map((name: string, i: number) => {
                                return (
                                    <div key={i}>
                                        <CategoryNav 
                                            name={name}          
                                            handleClick={handleCategoryChange}
                                        />
                                    </div>
                                );
                            }) 
                        }
                    </div>
                </div>
                <div className='categories__body'>
                    <ProductList 
                        products={products} 
                        loadMore={loadMoreProducts}
                        hasMore={hasProducts}
                    />
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
