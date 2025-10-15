'use client';

import Image from 'next/image';
import { forwardRef, useState } from 'react';

import s from './style.module.scss';

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  className?: string;
};

const ImagePlaceholder = forwardRef<HTMLDivElement, ImagePlaceholderProps>((props, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={ref} className={`${s.imagePreload} imagePreload ${isLoaded ? s.isLoaded : ''}`}>
      <Image
        className={`${props.className || ''} ${s.imagePreload_origin}`}
        onLoad={() => {
          setIsLoaded(true);
        }}
        sizes="100vw"
        width={50}
        height={50}
        {...props}
        alt={props.alt}
      />
      <Image
        className={`${props.className || ''} ${s.imagePreload_placeholder}`}
        src={props.src}
        width={50}
        height={50}
        loading="eager"
        alt="eager"
      />
    </div>
  );
});

ImagePlaceholder.displayName = 'ImagePlaceholder';
export default ImagePlaceholder;
