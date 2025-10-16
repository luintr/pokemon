import { Poppins, Inter, Noto_Sans_JP } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
});
