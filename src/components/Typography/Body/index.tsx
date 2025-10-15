'use client';
import cn from 'clsx';
import React, { ElementType, forwardRef } from 'react';

import s from './styles.module.scss';

type TypoBodyProps<T extends ElementType> = {
  tag?: T;
  color?: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const TypoBody = forwardRef(
  <T extends ElementType = 'p'>(
    props: TypoBodyProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const {
      tag: Component = 'p',
      color = 'text-b-100',
      size = 18,
      className,
      children,
      ...restProps
    } = props;

    const classes = cn(s.body, color && cn(color), s[`body_${size}`], className);

    return (
      <Component {...restProps} ref={ref} className={classes}>
        {children}
      </Component>
    );
  }
);

TypoBody.displayName = 'TypoBody';

export default TypoBody;
