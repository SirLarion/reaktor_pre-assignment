import { useState, useEffect } from 'react';

import ListContainer from './ListContainer';
import ProductList from './ProductList';
import CategoryNav from './CategoryNav';

import { categoryNames } from '../utils/constants';

import { 
    changeActiveCategoryButton,
    scrollPageToTop
} from '../utils/tools';

import '../css/categorycontainer.css';

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
            scrollPageToTop();
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
