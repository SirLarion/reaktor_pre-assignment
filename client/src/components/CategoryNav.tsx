const CategoryNav: React.FC<{name: string}> = ({name}) => {
    return (
        <div 
            className='categories__button'>
            { name }
        </div>
    );
}

export default CategoryNav;
