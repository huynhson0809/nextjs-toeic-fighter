import classNames from 'classnames/bind';
import { FC, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import images from '@/assets/images';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import _ from 'lodash'
import { User } from '@/components/ui';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
;


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
            title: 'Blog',
            url: '/blog'
        },
        {
            id: 4,
            title: 'About',
            url: '/about'
        },
    ]
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    console.log(cookies);

    const [currentUser, setCurrentUser] = useState(false)
    useEffect(() => {
        cookies && cookies.user ? setCurrentUser(true) : setCurrentUser(false)
    }, [cookies, cookies.user])

    const router = useRouter()
    const handleClickLogout = () => {
        removeCookie("user")
        router.push(`/`, undefined, {});
    }
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
                                    <Button variant="outline-secondary" href="/signup" size="lg">Register</Button>
                                </li>
                                :
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle as={User} id="dropdown-custom-components">
                                            <>
                                                <span>
                                                    <Image src={images.user} alt="user image" />
                                                </span>
                                            </>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/history">History</Dropdown.Item>
                                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={handleClickLogout}>Log out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown></>
                        }
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
