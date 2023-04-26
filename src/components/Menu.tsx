import { Link, useLocation } from 'react-router-dom';
import CorePage from '../CorePage';
import Button from './Button';

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
                    <Button routePath={page.pageRoutePath} icon={page.pageIcon}
                        active={location.pathname === page.pageRoutePath }
                        value={page.pageName} />
                </li>
            )}
        </ul>
    );
};

export default Menu;
