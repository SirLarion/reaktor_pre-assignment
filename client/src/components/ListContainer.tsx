import '../css/productlist.css';

const headerItems = ['Name', 'ID', 'Colors', 'Price', 'Manufacturer', 'Availability'];

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

export default ListContainer;
