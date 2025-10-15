import localFont from 'next/font/local';

const FR = localFont({
  src: [
    {
      path: './fonts/fire_red.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-FR',
  preload: true,
});

export const fonts = { className: `${FR.variable}` };
