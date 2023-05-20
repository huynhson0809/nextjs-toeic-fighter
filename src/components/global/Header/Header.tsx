import { faLock, faRightFromBracket, faRocket, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { FC, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

import images from '@/assets/images';
import { Button } from 'react-bootstrap';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import _ from 'lodash'
import { useRouter } from 'next/router';;


const cx = classNames.bind(styles);

interface HeaderProps {
}

const Header: FC<HeaderProps> = ({ ...props }) => {
    const menuHeading = [
        {
            id: 1,
            title: 'FullTest',
            url: '/fulltest'
        },
        {
            id: 2,
            title: 'MiniTest',
            url: '/minitest'
        },
        {
            id: 3,
            title: 'About',
            url: '/about'
        },
    ]

    const currentUser = true
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <h1 className={cx('logo')}>
                        <Link href="/">
                            <Image className={cx('logo-icon')} src={images.logofinal} alt="logo-pomodoro" />
                        </Link>
                    </h1>
                    <ul className={styles.menuList}>
                        {
                            menuHeading && menuHeading.length > 0 && menuHeading.map((item: any) => {
                                return (
                                    <li key={item.id} className={styles.menuItem}>
                                        <a href={item.url}>{item.title}</a>
                                    </li>
                                )
                            })
                        }
                        {
                            !currentUser ?
                                <li className={styles.authen}>
                                    <Button variant="primary" href="/login" size="lg">Login</Button>
                                    <Button variant="secondary" href="/register" size="lg">Register</Button>
                                </li>
                                :
                                <li className={styles.user}>
                                    <a>
                                        <span>
                                            <Image src={images.user} alt="user image" />
                                        </span>
                                    </a>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
