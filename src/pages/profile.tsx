import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"
import { useCookies } from "react-cookie";
const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [showEdit, setShowEdit] = useState(false)
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    useEffect(() => {
        if (cookies && cookies.user) {
            setUsername(cookies?.user?.userName)
            setEmail(cookies?.user?.email)
        }
    }, [cookies])
    const handleChangeUsername = (e: any) => {
        setUsername(e.target.value)
    }
    const handleChangeEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const handleSaveUpdateUser = async () => {
        setShowEdit(false)
        const newInfo = {
            username: username,
            email: email
        }
        await axios
            .put(`/api/user`, newInfo,
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${cookies?.user?.token}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then(res => {
                // console.log('res', res.data);
                res.data.token = cookies?.user?.token
                const user = res.data
                setCookie('user', JSON.stringify({ user }));
            })
            .catch(err => {
                console.log('error in request', err);
            });
    }

    const handleClickCancel = () => {
        setShowEdit(false)
        setUsername(cookies?.user?.userName)
        setEmail(cookies?.user?.email)
    }
    return (
        <div className="user-wrapper">
            <div className="user-inner">
                <h2 className="title-list-test">Profile</h2>
                <div className="user-content">
                    <div className="detail-user">
                        <div>Username:</div>
                        {
                            !showEdit ? <div>{username}</div> : <input value={username} onChange={handleChangeUsername} />
                        }
                    </div>
                    <div className="detail-user">
                        <div>Email:</div>
                        {
                            !showEdit ? <div>{email}</div> : <input value={email} onChange={handleChangeEmail} />
                        }
                    </div>
                </div>
                <div className="btn-user-wrapper">
                    {
                        !showEdit ? <Button size="lg" variant="info" onClick={() => setShowEdit(true)}>Update</Button> :
                            <><Button size="lg" variant="success" onClick={handleSaveUpdateUser}>Save</Button>
                                <Button size="lg" variant="secondary" onClick={handleClickCancel}>Cancel</Button></>
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile