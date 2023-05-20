import { faLock, faRightFromBracket, faRocket, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { FC, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

import images from '@/assets/images';
import { Button } from 'antd';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import _ from 'lodash'
import { useRouter } from 'next/router';;


const cx = classNames.bind(styles);

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({ ...props }) => {

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <h1 className={cx('logo')}>
                        <Link href="/">
                            <Image className={cx('logo-icon')} src={images.logo} alt="logo-pomodoro" />
                        </Link>
                    </h1>
                    <h2>Toeic Exam</h2>
                </div>
            </div>
        </header>
    );
}

export default Header;
