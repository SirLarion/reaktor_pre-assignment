import { useState, useEffect } from 'react';

import ProductList from './ProductList';
import CategoryNav from './CategoryNav';

import { getCategoryFromAPI } from '../utils/ProductServices';
import { ProductType, CategoryType } from '../types';
import { listDisplayLength } from '../utils/constants';

import '../css/categorylist.css';

function getNewCategory(newCategoryName: string): Promise<CategoryType> {
    return new Promise((resolve, reject) => {
        getCategoryFromAPI(newCategoryName, 0, listDisplayLength)
            .then(res => {
                const category: CategoryType = {
                    name: newCategoryName,
                    products: res
                };
                resolve(category);
            })
            .catch(res => {
                reject(res);
            });
    });
}

function getMoreSameCategory(categoryName: string, start: number): Promise<ProductType[]> {
    return new Promise((resolve, reject) => {
        getCategoryFromAPI(categoryName, start, start+listDisplayLength)
            .then(res => {
                resolve(res);
            })
            .catch(res => {
                reject(res);
            });
    });
}

const CategoryList: React.FC = () => {

    const categoryNames = ['Gloves', 'Facemasks', 'Beanies'];
    const initialProducts: ProductType[] = [];

    const [activeCategory, setCategory] = useState(categoryNames[0].toLowerCase());
    const [products, setProducts] = useState(initialProducts);
    const [hasProducts, setHasProducts] = useState(true);

    useEffect(() => {
        console.log('Loading products...');
        getNewCategory(activeCategory)
            .then(res => {
                setProducts(res.products);
            });
        const initialActive = document.getElementById(categoryNames[0])
        if(initialActive) {
            initialActive.className = 'categories__button button--active';
        }
    }, []);

    const handleCategoryChange = (event: React.MouseEvent): void => {
        event.preventDefault();
        const targetName = event.currentTarget.textContent;
        if(targetName && activeCategory !== targetName) {
            // Change to empty product list before loading the new one
            setHasProducts(true);
            setProducts(initialProducts);

            document.getElementsByClassName('button--active')[0].className = 'categories__button';
            event.currentTarget.className = 'categories__button button--active';

            getNewCategory(targetName.toLowerCase())
                .then(category => {
                    setCategory(category.name);
                    setProducts(category.products);
                });
        }
    }

    const handleLoadMoreProducts = (): void => {
        getMoreSameCategory(activeCategory.toLowerCase(), products.length)
            .then(res => {
                setProducts(products.concat(res));
            })
            .catch(err => {
                setHasProducts(false);
            });
    }

    return (
        <div className='categories'>
            <div className='categories__wrapper'>
                <div className='categories__header'>
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
                <div className='categories__body'>
                    <ProductList 
                        products={products} 
                        loadMore={handleLoadMoreProducts}
                        hasMore={hasProducts}
                    />
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
