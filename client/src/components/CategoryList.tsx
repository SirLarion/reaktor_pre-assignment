import { useState, useEffect } from 'react';

import ListContainer from './ListContainer';
import ProductList from './ProductList';
import CategoryNav from './CategoryNav';

import { ProductType } from '../types';

import { getCategoryFromAPI, getErrorMessage } from '../utils/ProductServices';
import { showModal, hideModal } from '../utils/modal';
import { listDisplayLength, categoryNames } from '../utils/constants';


import '../css/categorylist.css';


function getCategoryItems(categoryName: string, start: number) {
    return getCategoryFromAPI(categoryName, start, start+listDisplayLength);
}

function changeActiveCategoryButton(oldId: string, newId: string) {
    const oldActive = document.getElementById(oldId);
    const newActive = document.getElementById(newId);
    if(oldActive && newActive) {
        oldActive.className = 'categories__button';
        newActive.className = 'categories__button button--active';
    }
}

const CategoryList: React.FC = () => {

    const initialProducts: ProductType[] = [];

    const [errorFlag, setError] = useState('');
    const [activeCategory, setCategory] = useState(categoryNames[0].toLowerCase());
    const [products, setProducts] = useState(initialProducts);
    const [hasProducts, setHasProducts] = useState(true);


    const loadMoreProducts = (): void => {
        getCategoryItems(activeCategory.toLowerCase(), products.length)
            .then(res => {
                if(res.status === 200) {
                    setProducts(products.concat(res.data));
                }
                else if(res.status === 204) {
                    setHasProducts(false);
                }
            })
            .catch(err => {
                console.log(err);
                //setError(getErrorMessage(err.status));
            });
    }

    const handleCategoryChange = (event: React.MouseEvent): void => {
        event.preventDefault();
        const targetName = event.currentTarget.textContent;
        const activeName = activeCategory;
        if(targetName && activeName !== targetName.toLowerCase()) {
            showModal();
            setError('');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const targetLower = targetName.toLowerCase();
            changeActiveCategoryButton(activeName, targetLower);

            setCategory(targetLower);
            
            getCategoryItems(targetLower, 0)
                .then(res => {
                    setHasProducts(true);
                    setProducts(res.data);
                })
                .catch(err => {
                    setHasProducts(false);
                    setProducts(initialProducts);
                    setError(getErrorMessage(err.status));
                })
                .finally(hideModal);
        }
    }

    useEffect(() => {
        console.log('Loading products...');
        showModal();
        const initialCategory = categoryNames[0].toLowerCase();
        changeActiveCategoryButton(initialCategory, initialCategory);

        getCategoryItems(initialCategory, 0)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                setError(getErrorMessage(err.status));
            })
            .finally(hideModal);
    }, []);

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
                    <ListContainer>
                        <ProductList 
                            error={errorFlag}
                            products={products} 
                            loadMore={loadMoreProducts}
                            hasMore={hasProducts}
                        />
                    </ListContainer>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
