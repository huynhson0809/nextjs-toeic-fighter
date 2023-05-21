import React, { useState } from 'react';
import { Blog } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';
import images from '@/assets/images';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showErrorEmail, setShowErrorEmail] = useState(false)
    const [showErrorPass, setShowErrorPass] = useState(false)
    const [showWrong, setShowWrong] = useState(false)
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const handleChangePassword = (e: any) => {
        const newPass = e.target.value
        setPassword(newPass)
    }
    const handleChangeEmail = (e: any) => {
        const newEmail = e.target.value
        setEmail(newEmail);
    }
    const handleClickLogin = async () => {
        const regexEmail =
            /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
        if (regexEmail.test(email)) {
            setShowErrorEmail(false);
            if (password.length < 8) {
                setShowErrorPass(true)
            }
            else {
                await axios
                    .post('/auth/login', {
                        "email": email,
                        "password": password
                    }
                    )
                    .then(res => {
                        // console.log('res', res.data);
                        setShowErrorPass(false)
                        router.push(`/`, undefined, {});
                        const result = res.data.data
                        setCookie('user', JSON.stringify(result), {
                            path: '/',
                        });
                    })
                    .catch(err => {
                        // console.log('error in request', err);
                        const codeError = err?.response?.status
                        if (codeError != 200) {
                            setShowErrorEmail(false)
                            setShowErrorPass(false)
                            setShowWrong(true)
                        }
                    });
            }
        } else {
            setShowErrorEmail(true)
        }
    }

    return (
        <>
            <div className="login-wrapper">
                <div className='login-inner'>
                    <div className='login-content'>
                        <h1 className='logo'>
                            <Link href="/">
                                <Image className="login-logo-icon" src={images.logofinalgray} alt="logo-pomodoro" />
                            </Link>
                        </h1>
                        <div className='login-title'>Login</div>
                        <div className='login-main'>
                            <div className='login-label '>Email</div>
                            <input placeholder='example@mail.com' value={email} onChange={handleChangeEmail} />
                            <div className='login-label '>Password</div>
                            <input type="password" className='login-pass' value={password} onChange={handleChangePassword} />
                            {
                                showErrorEmail ? <p>Please input valid email</p> :
                                    <>
                                        {
                                            showErrorPass ? <p>Password must contain least 8 characters</p> : <></>
                                        }
                                    </>
                            }
                            {
                                !showErrorPass && !showErrorEmail && showWrong ? <p>something went wrong</p> : <></>
                            }
                            <div className='login-submit'>
                                <Button size='lg' onClick={handleClickLogin}>Login</Button>
                            </div>
                            <div className='login-forgot-pass'>
                                <Button onClick={() => {
                                    router.push(`/resetpassword`, undefined, {});
                                }}>Forgot Password</Button>
                            </div>
                        </div>
                        <div className='login-sign-up'>
                            <div>Do not have an account?</div>
                            <Button onClick={() => {
                                router.push(`/signup`, undefined, {});
                            }}>Create account</Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
export default Login