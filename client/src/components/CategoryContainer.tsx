import { useState, useEffect } from 'react';

import ListContainer from './ListContainer';
import ProductList from './ProductList';
import CategoryNav from './CategoryNav';

import { categoryNames } from '../utils/constants';

import '../css/categorycontainer.css';

// Helper; changes which of the category nav buttons is displayed as active
function changeActiveCategoryButton(oldId: string, newId: string) {
    const oldActive = document.getElementById(oldId);
    const newActive = document.getElementById(newId);
    if(oldActive && newActive) {
        oldActive.className = 'categories__button';
        newActive.className = 'categories__button button--active';
    }
}

//===================================================================/
/*
 * Container for category switching controls and the list of products of the
 * active category
 */
const CategoryContainer: React.FC = () => {

    // The name of the category currently 'active' in lowercase
    const [activeCategory, setCategory] = useState(categoryNames[0].toLowerCase());

    /*
     * Event handler for changing category. 
     */
    const handleCategoryChange = (event: React.MouseEvent): void => {
        event.preventDefault();
        const targetName = event.currentTarget.textContent;
        const activeName = activeCategory;

        // Do nothing if the button for the currently active category was pressed
        if(targetName && activeName !== targetName.toLowerCase()) {

            // Scroll back to top: smoothly if the page hadn't been scrolled
            // much, otherwise snap
            if(document.documentElement.scrollTop < 3 * window.innerHeight) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else window.scrollTo(0, 0);

            const targetLower = targetName.toLowerCase();
            changeActiveCategoryButton(activeName, targetLower);

            setCategory(targetLower);
        }
    }

    // Make the button of the initial category active
    useEffect(() => {
        const initialCategory = categoryNames[0].toLowerCase();
        changeActiveCategoryButton(initialCategory, initialCategory)
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
                            activeCategory={activeCategory}
                        />
                    </ListContainer>
                </div>
            </div>
        </div>
    );
}

//===================================================================/
// CategoryContainer end


export default CategoryContainer;
