import { useState, useEffect } from 'react';

import ProductList from './ProductList';
import CategoryNav from './CategoryNav';

import { getCategoryFromAPI } from '../utils/ProductServices';
import { CategoryType } from '../types';

import '../css/categorylist.css';

function getNewCategory(newCategory: string): Promise<CategoryType> {
    // TODO: Rejection?
    return new Promise((resolve, reject) => {
        getCategoryFromAPI('gloves')
            .then(res => {
                const category: CategoryType = {
                    name: newCategory,
                    products: res
                };
                resolve(category);
            });
    });
}

const CategoryList: React.FC = () => {

    const categoryNames = ['Gloves', 'Facemasks', 'Beanies'];

    const initialCategory: CategoryType = {
        name: '',
        products: []
    }
    const [activeCategory, setCategory] = useState(initialCategory);

    useEffect(() => {
        console.log('Loading products...');
        getNewCategory(categoryNames[0].toLowerCase())
            .then(category => {
                setCategory(category);
            });
        const initialActive = document.getElementById(categoryNames[0])
        if(initialActive) initialActive.className = 'categories__button button--active';
    }, []);

    const handleCategoryChange = (event: React.MouseEvent): void => {
        event.preventDefault();
        const targetName = event.currentTarget.textContent;
        console.log(targetName);
        if(targetName && activeCategory.name !== targetName) {
            // Change to empty category before loading the new one
            setCategory(initialCategory);

            document.getElementsByClassName('button--active')[0].className = 'categories__button';
            event.currentTarget.className = 'categories__button button--active';

            getNewCategory(targetName.toLowerCase())
                .then(category => {
                    setCategory(category);
                });

        }
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
                    <ProductList products={activeCategory.products} />
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
