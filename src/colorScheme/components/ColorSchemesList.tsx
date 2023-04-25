
import ColorScheme from '../ColorScheme';
import ColorSchemePreview from './ColorSchemePreview';

interface ColorSchemesListParams{
    colorSchemes: ColorScheme[]
}

export const ColorSchemesList: React.FC<ColorSchemesListParams> = ({colorSchemes}) => {
    return (
        <section id="color-schemes-list">
            {colorSchemes.map((colorScheme, index) => 
                <ColorSchemePreview colorScheme={colorScheme} 
                    key={`${colorScheme.id}-ind${index}`} />
            )}
        </section>
    )
};

export default ColorSchemesList;