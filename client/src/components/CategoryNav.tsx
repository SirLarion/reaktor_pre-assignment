import '../css/categorylist.css';

interface Props {
    name: string;
    handleClick: (event: React.MouseEvent) => void;
}

const CategoryNav: React.FC<Props> = ({name, handleClick}) => {
    return (
        <div 
            id={name}
            className='categories__button'
            onClick={handleClick}
        >
            { name }
        </div>
    );
}

export default CategoryNav;
