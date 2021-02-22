import React from 'react';

import CategoryList from './components/CategoryList';

import './css/App.css';
import logo from './resources/clothes_brand.svg';
import loading from './resources/loading.svg'

const ClothesListingApp: React.FC = () => {
    return (
        <div className='app'>
            <div className='app__header'>
                <img 
                    className='app__logo noselect' 
                    src={logo} 
                    alt='Clothes Brand' 
                />
                <div className='app__text noselect'>Storage</div>
            </div>
            <div className='app__body'>
                <CategoryList />
            </div>
            <div id='modal'>
                <img className='loading' src={loading} alt='Loading...'/>
            </div>
        </div>
    );
}

export default ClothesListingApp;
