'use client';

import { useState, useCallback } from 'react';

interface UseRemoveBackgroundReturn {
  processedImage: File | null;
  previewUrl: string | null;
  loading: boolean;
  error: Error | null;
  removeBackground: (file: File, threshold?: number) => Promise<File | null>;
}

export function useRemoveBackground(): UseRemoveBackgroundReturn {
  const [processedImage, setProcessedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const removeBackground = useCallback(async (file: File, threshold: number = 240): Promise<File | null> => {
    if (!file) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      // Load image
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Draw image
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Flood fill algorithm to remove only outer white background
      const width = canvas.width;
      const height = canvas.height;
      const visited = new Set<number>();

      // Check if pixel is white or near white
      const isWhite = (x: number, y: number): boolean => {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        return r > threshold && g > threshold && b > threshold;
      };

      // Flood fill from a starting point
      const floodFill = (startX: number, startY: number) => {
        const queue: [number, number][] = [[startX, startY]];
        
        while (queue.length > 0) {
          const [x, y] = queue.shift()!;
          
          // Check boundaries
          if (x < 0 || x >= width || y < 0 || y >= height) continue;
          
          const idx = y * width + x;
          
          // Skip if already visited
          if (visited.has(idx)) continue;
          
          // Skip if not white
          if (!isWhite(x, y)) continue;
          
          // Mark as visited and make transparent
          visited.add(idx);
          data[idx * 4 + 3] = 0; // Set alpha to 0
          
          // Add neighbors to queue
          queue.push([x + 1, y]);
          queue.push([x - 1, y]);
          queue.push([x, y + 1]);
          queue.push([x, y - 1]);
        }
      };

      // Start flood fill from all edges
      // Top and bottom edges
      for (let x = 0; x < width; x++) {
        if (isWhite(x, 0)) floodFill(x, 0);
        if (isWhite(x, height - 1)) floodFill(x, height - 1);
      }
      
      // Left and right edges
      for (let y = 0; y < height; y++) {
        if (isWhite(0, y)) floodFill(0, y);
        if (isWhite(width - 1, y)) floodFill(width - 1, y);
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        }, 'image/png');
      });

      // Convert blob to File
      const processedFile = new File([blob], `no-bg-${file.name}`, { type: 'image/png' });
      
      // Create preview URL
      const preview = URL.createObjectURL(blob);
      
      setProcessedImage(processedFile);
      setPreviewUrl(preview);
      URL.revokeObjectURL(objectUrl);
      
      return processedFile;
    } catch (err) {
      console.error('Error removing background:', err);
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    processedImage,
    previewUrl,
    loading,
    error,
    removeBackground,
  };
}

