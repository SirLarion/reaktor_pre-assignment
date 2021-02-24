interface Props {
    name: string;
    handleClick: (event: React.MouseEvent) => void;
}

//===================================================================/
// Button component for CategoryContainer
const CategoryNav: React.FC<Props> = ({name, handleClick}) => {
    return (
        <div 
            id={name.toLowerCase()}
            className='categories__button'
            onClick={handleClick}
        >
            { name }
        </div>
    );
}

//===================================================================/

export default CategoryNav;
