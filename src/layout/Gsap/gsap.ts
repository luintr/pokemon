import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { DrawSVGPlugin } from 'gsap/dist/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(
  ScrollTrigger,
  useGSAP,
  SplitText,
  Flip,
  MorphSVGPlugin,
  DrawSVGPlugin,
  CustomEase
);

const GOLDEN_RATIO: number = (1 + Math.sqrt(5)) / 2;
const RECIPROCAL_GR: number = 1 / GOLDEN_RATIO;
const DURATION: number = RECIPROCAL_GR * 1.4;
const DELAY_TIMELINE: number = 0.55;

export {
  CustomEase,
  DELAY_TIMELINE,
  DrawSVGPlugin,
  DURATION,
  Flip,
  gsap,
  MorphSVGPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
};
