import { ItemDaoFirebase } from '@terrestrialorigin/core-firebase';
import ColorScheme from './ColorScheme';

export class ColorSchemeDao extends ItemDaoFirebase<ColorScheme> {
    constructor() {
        super("Color");
    }
}

export default ColorSchemeDao;