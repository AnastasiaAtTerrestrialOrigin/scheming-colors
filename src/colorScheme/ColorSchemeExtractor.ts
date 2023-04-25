import ColorScheme, { generateColorSchemeId } from './ColorScheme';

export class ColorSchemeExtractor {
  private static rgbRegex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)|rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([\d.]+)\)/gi;
  private static hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
  private static funnyHexRejex = /"hex":"[A-Fa-f0-9]{6}"/g;

  private static rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  public static extractColors(content: string): string[] {
    const hexColors: string[] = [];
    const rgbColors: string[] = [];
    let match: RegExpExecArray | null;

    // Find and store hex codes
    while ((match = ColorSchemeExtractor.hexRegex.exec(content)) !== null) {
      let color = match[0].toLowerCase();
        color = color.charAt(0) === "#" ? color : "#" + color;
        hexColors.push(color);
    }

    // Find and store rgb and rgba codes
    while ((match = ColorSchemeExtractor.rgbRegex.exec(content)) !== null) {
      const r = parseInt(match[1] || match[4], 10);
      const g = parseInt(match[2] || match[5], 10);
      const b = parseInt(match[3] || match[6], 10);
      const hexColor = ColorSchemeExtractor.rgbToHex(r, g, b);
      rgbColors.push(hexColor.toLowerCase());
    }
    
    //old coolors format
    while ((match = ColorSchemeExtractor.funnyHexRejex.exec(content)) !== null) {
        let foundStr = match[0];
        foundStr = foundStr.replaceAll("\"", "");
        foundStr = foundStr.replaceAll("hex:", "");
        foundStr = "#"+foundStr;
        console.log("Found string being pushed: ", foundStr);
        hexColors.push(foundStr);
    }

    // Combine the found hex and RGB colors
    let colors = [...hexColors, ...rgbColors];
    // delete duplicate colors
    colors = Array.from(new Set(colors));

    return colors;
  }
}

// below methods are for if something messed up and we end up with duplicate 
// colors in a color scheme
   
const getDedupInfo = (colorSchemes: ColorScheme[]) => {
   const newColors = [];
   const colorsToDelete = [];
   const colorsToAdd = []; 

   for(let colorScheme of colorSchemes) {
       const uniqueColors = new Set(colorScheme.colors);

       if (uniqueColors.size != colorScheme.colors.length){
           const uniqueColorsArray = Array.from(uniqueColors);
           colorsToDelete.push(colorScheme);
           colorsToAdd.push({id: generateColorSchemeId(uniqueColorsArray as string[]), 
            colors: uniqueColorsArray, name: colorScheme.name});
       }
   }

   return {colorsToAdd, colorsToDelete}
}


//const eliminateDuplicates = () => {
//    for(let colorToDelete of colorsToDelete) {
//        colorSchemeDao.deleteItem(colorToDelete).then((response)=> {
//            console.log("Deleted color scheme: ", colorToDelete);
//        })
//        .catch((error) => {
//            console.error("Error deleting color scheme, ", colorToDelete);
//        })
//    }
//    for(let colorToAdd of colorsToAdd) {
//        colorSchemeDao.saveItem(colorToAdd).then((response)=> {
//            console.log("Added color scheme: ", colorToAdd);
//        })
//        .catch((error) => {
//            console.error("Error adding color scheme, ", colorToAdd);
//        })
//    }
//}


export default ColorSchemeExtractor;