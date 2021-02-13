import React from 'react';

import CategoryList from './components/CategoryList';

import './css/App.css';
import logo from './resources/clothes_brand.svg';

const ClothesListingApp: React.FC = () => {
    return (
        <div className='app'>
            <div className='app__header'>
                <img className='app__logo' src={logo} alt='Clothes Brand' />
            </div>
            <div className='app__body'>
                <CategoryList />
            </div>
        </div>
    );
}

export default ClothesListingApp;
