import ProductList from './ProductList';

import '../css/categorylist.css';

const CategoryList: React.FC = () => {


    return (
        <div className='categories'>
            <div className='categories__wrapper'>
                <div className='categories__header'>
                    <div className='categories__button'>Gloves</div>
                    <div className='categories__button'>Facemasks</div>
                    <div className='categories__button'>Beanies</div>
                </div>
                <div className='categories__body'>
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
