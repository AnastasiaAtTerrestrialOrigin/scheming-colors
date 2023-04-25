import { Link, useLocation } from 'react-router-dom';
import CorePage from '../CorePage';

import { CiGrid41 as PageIcon } from 'react-icons/ci';

import './Menu.css';

interface MenuParams {
    pages: CorePage[],
    currentPage?: CorePage
}

export const Menu: React.FC<MenuParams> = ({ pages }) => {
    
    const location = useLocation();
    
    return(
        <ul className="menu" id="main-nav">
            { pages.map((page, index) =>
                <li key={`pageNum${index}`}>                
                    <Link to={page.pageRoutePath} 
                        className={`button ${location.pathname === page.pageRoutePath ? "active" : ""}`}>                    
                        <page.pageIcon className="icon" />
                        <label>{page.pageName}</label>
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default Menu;
