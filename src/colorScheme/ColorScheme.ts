import {Item} from '@terrestrialorigin/core';

export interface ColorScheme extends Item {
    colors: string[]
}

/** Generates a unique id for the color scheme based solely on the colors.
 *  We do not care about anything else in the color scheme, like name or
 *  description. We want to guarantee uniqueness of the combination of colors.
 *  There should not be two different color scheme objects w/ same exact
 *  combination of colors in them.
 */
export function generateColorSchemeId(colors: string[]) {
    if (!colors?.length)
        throw Error("Unable to generate id for a color scheme with no colors");
        
    colors = colors.map((color) => color.toLocaleLowerCase());
    colors = colors.sort();
    const colorString = colors.join('');
    
    let hash = 0;
    for (let i = 0; i < colorString.length; i++) {
      const char = colorString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
    
    return `id_${Math.abs(hash)}`;
}

export default ColorScheme;