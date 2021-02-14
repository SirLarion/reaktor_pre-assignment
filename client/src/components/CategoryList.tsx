import { useState, useEffect } from 'react';

import ProductList from './ProductList';
import CategoryNav from './CategoryNav';

import { getCategory, getAvailability } from '../utils/ProductServices';
import { CategoryType } from '../types';

import '../css/categorylist.css';

function toCategory(name: string, index: number) {
    return (
        <div key={index}>
            <CategoryNav name={name} />
        </div>
    );
}

const CategoryList: React.FC = () => {

    const categoryNames = ['Gloves', 'Facemasks', 'Beanies'];

    const categoriesInitial: CategoryType[] = [];
    const [categories, setCategories] = useState(categoriesInitial);

    useEffect(() => {
        console.log('Loading products...');
        let categoriesNew = categories;
        //categoryNames.forEach(categoryName => {
        //const catName = categoryName.toLowerCase();
        const catName = 'beanies';
        /*
        const productsNew = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => catName.slice(0, -1));
        categoriesNew.push({name: categoryName, products: productsNew});
        */
        getCategory(catName)
            .then(res => {
                console.log(res);
            })
        //});
        setCategories(categoriesNew);
    }, []);

    return (
        <div className='categories'>
            <div className='categories__wrapper'>
                <div className='categories__header'>
                    { categoryNames.map(toCategory) }
                </div>
                <div className='categories__body'>
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
