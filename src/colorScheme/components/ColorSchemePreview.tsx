import ColorScheme from '../ColorScheme';

import './colorSchemePreview.css';

interface ColorSchemePreviewParams {
    colorScheme: ColorScheme,
    showHexCode?: boolean
}

export const ColorSchemePreview: React.FC<ColorSchemePreviewParams> = ({ 
        colorScheme, showHexCode }) => {
    
    function getContrastColor(hexColor: string): string {
        // Remove '#' from the hex color if it exists
        const sanitizedHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;

        // Convert the hex color to RGB
        const r = parseInt(sanitizedHex.slice(0, 2), 16);
        const g = parseInt(sanitizedHex.slice(2, 4), 16);
        const b = parseInt(sanitizedHex.slice(4, 6), 16);

        // Calculate the luminance using the relative luminance formula
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Determine the appropriate contrast color
        return luminance > 128 ? '#000000' : '#ffffff';
    }
    
    return (
        <div className="color-scheme-preview">
            {colorScheme.colors?.map((color, index) => 
                <span key={`${index}-${color}`} className="color" 
                        style={{backgroundColor: color}}>
                    
                    <span className="color-tag" style={{"color": getContrastColor(color),
                            display: showHexCode ? "inline" : "none"}}>
                        {color}
                    </span>
                    
                </span>
            )}
            
        </div>
    );
};

export default ColorSchemePreview;