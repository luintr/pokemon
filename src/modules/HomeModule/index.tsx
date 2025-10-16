'use client';

import TypoBody from '@Components/Typography/Body';
import React from 'react';
import { useRemoveBackground } from '@Hooks/useRemoveBackground';
import { useDominantColor } from '@Hooks/useDominantColor';

import s from './style.module.scss';

const HomeModule = (): JSX.Element => {
  const { 
    processedImage, 
    previewUrl, 
    loading, 
    error, 
    removeBackground 
  } = useRemoveBackground();

  // Get dominant color from processed image
  const dominantColor = useDominantColor(previewUrl || undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      removeBackground(file, 240); // threshold = 240
    }
  };

  const handleExportPng = () => {
    if (!processedImage) return;
    
    // Create download link
    const url = URL.createObjectURL(processedImage);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pokemon-no-bg-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`${s.home}`}>
      <section 
        className={s.section1}
        style={{
          backgroundColor: dominantColor || 'var(--primary-maroon)',
          transition: 'background-color 0.5s ease'
        }}
      >
        <h2>Remove White Background</h2>
        <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '20px' }}>
          Upload ảnh có nền trắng để tách chủ thể
        </p>
        {dominantColor && (
          <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '20px' }}>
            🎨 Dominant color detected: <span style={{ color: dominantColor, fontWeight: 'bold' }}>{dominantColor}</span>
          </p>
        )}
        
        {/* Upload & Remove Background */}
        <div style={{ marginBottom: '30px' }}>
          <input 
            type="file" 
            accept="image/png,image/jpg,image/jpeg" 
            onChange={handleFileChange}
          />
          {loading && <p>Đang xóa nền...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>

        {/* Preview after remove background */}
        {previewUrl && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Preview (đã xóa nền):</h3>
            <div style={{ 
              backgroundSize: '20px 20px', 
              backgroundPosition: '0 0, 10px 10px',
              display: 'inline-block',
              padding: '20px',
              borderRadius: '8px'
            }}>
              <img src={previewUrl} alt="No background" style={{ maxWidth: '400px', display: 'block' }} />
            </div>
            <button 
              onClick={handleExportPng}
              style={{ 
                marginTop: '10px',
                padding: '10px 20px', 
                fontSize: '16px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              📥 Export PNG
            </button>
          </div>
        )}

      </section>
      
      <section>this is section 2</section>

      <div className={`${s.section3} layout-grid`}>
        <TypoBody tag="h2" size={30} className={`${s.section3_title}`}>
          Title
        </TypoBody>
        <TypoBody tag="p" size={26} className={`${s.section3_description}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </TypoBody>
      </div>
    </div>
  );
};

export default HomeModule;
