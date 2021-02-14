//import Product from './Product';

import '../css/productlist.css';

function toProduct(index: number) {
    return (
        <div key={index}>
            <div className='product'>
                I am product
            </div>
            {/*<Product />*/}
        </div>
    );
}

const ProductList: React.FC = () => {

    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className='list'>
            {items.map(toProduct)}
        </div>
    );
}

export default ProductList;
