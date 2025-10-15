import TypoBody from '@Components/Typography/Body';
import React from 'react';

import s from './style.module.scss';
const HomeModule = (): JSX.Element => {
  return (
    <div className={`${s.home}`}>
      <section>this is section 1</section>
      <section>this is section 2</section>

      <div className={`${s.section3} layout-grid`}>
        <TypoBody tag="h2" size={18} className={`${s.section3_title}`}>
          Title
        </TypoBody>
        <TypoBody tag="p" size={16} className={`${s.section3_description}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </TypoBody>
      </div>
    </div>
  );
};

export default HomeModule;
