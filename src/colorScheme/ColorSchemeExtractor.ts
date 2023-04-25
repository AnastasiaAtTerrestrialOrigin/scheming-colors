
export class ColorSchemeExtractor {
  private static rgbRegex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)|rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([\d.]+)\)/gi;
  private static hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;

  private static rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  public static extractColors(content: string): string[] {
    const hexColors: string[] = [];
    const rgbColors: string[] = [];
    let match: RegExpExecArray | null;

    // Find and store hex codes
    while ((match = ColorSchemeExtractor.hexRegex.exec(content)) !== null) {
      hexColors.push(match[0].toLowerCase());
    }

    // Find and store rgb and rgba codes
    while ((match = ColorSchemeExtractor.rgbRegex.exec(content)) !== null) {
      const r = parseInt(match[1] || match[4], 10);
      const g = parseInt(match[2] || match[5], 10);
      const b = parseInt(match[3] || match[6], 10);
      const hexColor = ColorSchemeExtractor.rgbToHex(r, g, b);
      rgbColors.push(hexColor.toLowerCase());
    }

    // Combine the found hex and RGB colors
    const colors = [...hexColors, ...rgbColors];

    return colors;
  }
}

export default ColorSchemeExtractor;