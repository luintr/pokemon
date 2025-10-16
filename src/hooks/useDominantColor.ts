import { useState, useEffect } from "react";

export function useDominantColor(imageUrl?: string): string | null {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCount: Record<string, number> = {};
        
        // Sample every 4th pixel to avoid transparent pixels
        for (let i = 0; i < imageData.length; i += 16) { // Every 4th pixel (4*4)
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];
          
          // Skip transparent pixels (alpha < 128)
          if (a < 128) continue;
          
          // Skip very light colors (likely background artifacts)
          if (r > 240 && g > 240 && b > 240) continue;
          
          // Skip very dark colors (likely shadows/outlines)
          if (r < 30 && g < 30 && b < 30) continue;
          
          const key = `${r},${g},${b}`;
          colorCount[key] = (colorCount[key] || 0) + 1;
        }
        
        const dominant = Object.entries(colorCount).sort((a, b) => b[1] - a[1])[0];
        if (dominant) {
          const [r, g, b] = dominant[0].split(",").map(Number);
          const hex = rgbToHex(r, g, b);
          console.log('Dominant color:', hex, 'RGB:', r, g, b);
          setColor(hex);
        }
      } catch (err) {
        console.error("Failed to extract color", err);
      }
    };
  }, [imageUrl]);

  return color;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
