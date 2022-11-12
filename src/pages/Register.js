import '../styles/Login.css'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Contact() {

    const [data, setData] = useState({ userName: '', email: '', passwd: '' })
    const navigate = useNavigate()

    const handleChange = eve => {
        const { name, value } = eve.target
        setData(prev => {
            return { ...prev, [name]: value }
        })
    }

    async function login(e) {
        e.preventDefault();

        axios.post('http://localhost:8000/register', { user: data.userName, email: data.email, passwd: data.passwd })
            .then(res => {
                if (res.data.status === 'error') alert(res.data.error)
                else navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='login-bg'>
            <div className='log-box'>
                <div className='log1 reg1'>
                    <Link className='lr login' to='/login'>Login</Link>
                    <Link className='lr reg' to='/register'>Register</Link>
                </div>

                <form onSubmit={login} className='log-form reg-form'>
                    <label>
                        UserName
                        <input type='text' name='userName' required value={data.userName} onChange={handleChange} />
                    </label>
                    <label>
                        Email Add.
                        <input type='email' name='email' required value={data.email} onChange={handleChange} />
                    </label>
                    <label>
                        Password
                        <input type='password' name='passwd' required value={data.passwd} onChange={handleChange} />
                    </label>
                    <input type='submit' value='Register' className='log-sub' />
                </form>

            </div>
        </div>
    )
}