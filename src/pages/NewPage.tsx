import CorePage from '../CorePage';

import { CiSquarePlus as pageIcon } from 'react-icons/ci';

    
const PAGE_NAME = "New";
const PAGE_PATH = "/new";

export const NewPage: CorePage = ({}) => {
    return (
        <div id="new-page">
            icon should be below here <br />
            
            This allows you to create a new color scheme
        </div>
    );
};

NewPage.pageName = PAGE_NAME;
NewPage.pageRoutePath = PAGE_PATH;
NewPage.pageIcon = pageIcon;

export default NewPage;
