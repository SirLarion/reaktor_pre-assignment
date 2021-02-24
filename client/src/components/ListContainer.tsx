import '../css/productlist.css';

const headerItems = ['Name', 'ID', 'Colors', 'Price', 'Manufacturer', 'Availability'];

//===================================================================/
/*
 * Container for the list of products and a header containing the names
 * of each attribute of the products. The actual list (see ProductList)
 * is implemented as a child
 */
const ListContainer: React.FC = ({children}) => {
    return (
        <div className='list'>
            <div className='list__header'>
                {
                    headerItems.map((item: string, i: number) => {
                        return (
                            <div key={i} className='list__attribute'>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
            { children }
        </div>
    );
}

//===================================================================/

export default ListContainer;
