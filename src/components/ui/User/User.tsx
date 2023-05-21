import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import styles from "./User.module.scss";
import Image from 'next/image';
import images from '@/assets/images';
import Link from 'next/link';

export interface CustomToggleProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

const User: ForwardRefRenderFunction<HTMLAnchorElement, CustomToggleProps> = (
  { children, onClick },
  ref
) => (
  <Link className={styles.user} id="dropdown-basic-button" title="Dropdown button" ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }} href="">
    {children}
  </Link>
);
export default forwardRef(User);
