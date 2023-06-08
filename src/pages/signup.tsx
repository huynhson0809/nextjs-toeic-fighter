import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import images from '@/assets/images';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';


const Signup = () => {
    const [email, setEmail] = useState("")
    const [showErrorEmail, setShowErrorEmail] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const router = useRouter();
    const handleChangeEmail = (e: any) => {
        const newEmail = e.target.value
        setEmail(newEmail);
    }
    const handleClickSignUp = async () => {
        const regexEmail =
            /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
        if (regexEmail.test(email)) {
            setShowErrorEmail(false);
            await axios
                .post('/auth/signup', {
                    "email": email,
                }
                )
                .then(res => {
                    console.log('res', res.data);
                    setIsSuccess(true)
                })
                .catch(err => {
                    console.log('error in request', err);
                    // console.log(err.response?.data?.message);
                    setErrorMessage(err.response?.data?.message)
                    setShowErrorEmail(true)
                });
            // setIsSuccess(true)
        } else {
            setShowErrorEmail(true)
            setErrorMessage("")
        }
    }
    return (
        <>
            <div className="login-wrapper">
                <div className='login-inner'>
                    {
                        isSuccess ?
                            <div className='login-success'>
                                <h1 className='logo'>
                                    <Link href="/">
                                        <Image className="login-logo-icon-after" src={images.logofinalgray} alt="logo-pomodoro" />
                                    </Link>
                                </h1>
                                <div className='login-sc-title'>Activation link have been sent</div>
                                <div className='login-nof-success'>Activation link have been sent to your email address. To start using Pomofocus, please activate your account from the link.</div>
                                <Button href="/login" size="lg" variant='primary'>Go to Login</Button>
                            </div> :
                            <div className='login-content'>
                                <h1 className='logo'>
                                    <Link href="/">
                                        <Image className="login-logo-icon" src={images.logofinalgray} alt="logo-pomodoro" />
                                    </Link>
                                </h1>
                                <div className='login-title'>Create Account</div>
                                <div className='login-main'>
                                    <div className='login-label '>Email</div>
                                    <input placeholder='example@mail.com' value={email} onChange={handleChangeEmail} />
                                    {
                                        showErrorEmail ? errorMessage ? <p>{errorMessage}</p> : <p>Please input valid email</p> :
                                            <>
                                            </>
                                    }
                                    <div className='login-submit'>
                                        <Button size='lg' onClick={handleClickSignUp}>Sign up</Button>
                                    </div>
                                </div>
                                <div className='login-sign-up'>
                                    <div>Already have an account?</div>
                                    <Button onClick={() => {
                                        router.push(`/login`, undefined, {});
                                    }}>Log in</Button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}
export default Signup