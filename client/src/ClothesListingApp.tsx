import React from 'react';

import CategoryContainer from './components/CategoryContainer';

import './css/App.css';
import logo from './resources/clothes_brand.svg';
import loading from './resources/loading.svg'


//===================================================================/
/*
 * Main App. Clothes storage listing for 'Clothes Brand' made
 * as a pre-assignment for Reaktor 2021 summer job application
 */
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
                <CategoryContainer />
            </div>
            <div id='modal' style={{display:'none'}}>
                <img 
                    className='loading' 
                    src={loading} 
                    alt='Loading...'
                />
            </div>
        </div>
    );
}
//===================================================================/

export default ClothesListingApp;
