import { ItemDaoFirebase } from '@terrestrialorigin/core-firebase';
import ColorScheme from './ColorScheme';

export class ColorSchemeDao extends ItemDaoFirebase<ColorScheme> {
    constructor() {
        super("ColorScheme");
    }
}

export default ColorSchemeDao;