import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Editprofile() {

    const navigate = useNavigate()
    const allData = { name: '', email: '', contact: '', address: '', gender: '', dob: '', about: '', image: { name: '', file: null } }
    const [data, setData] = useState(allData)

    function update(event) {

        const { name, value, files } = event.target
        setData(prevData => {
            if (files) return { ...prevData, [name]: { file: files[0], name: value } }
            return { ...prevData, [name]: value }
        })
    }


    function submitdata(e) {
        e.preventDefault()

        const fileReader = new FileReader()
        fileReader.readAsDataURL(data.image.file)

        fileReader.onload = () => {
            const fileURL = fileReader.result
            const config = { headers: { "content-type": 'application/json' }, }
            axios.post('http://localhost:8000/edit-profile', {
                name: data.name,
                email: data.email,
                address: data.address,
                contact: data.contact,
                gender: data.gender,
                about: data.about,
                dob: data.dob,
                token: localStorage.getItem('token'),
                fileURL
            }
                , config)
                .then(res => {
                    if (res.data.status === 'error') alert(res.data.message)
                    else { navigate('/profile') }
                })
                .catch((err) => alert(err));
        }
    }

    return (
        <div className="profile">

            <form onSubmit={submitdata} className="edit-profile-data" method='post' encType="multipart/form-data">
                <label> Name -
                    <input type='text' name="name" onChange={update} value={data.name} required />
                </label>
                <label> Email -
                    <input type='email' name="email" onChange={update} value={data.email} required />
                </label>
                <label> Contact -
                    <input type='number' name="contact" onChange={update} value={data.contact} required />
                </label>
                <label> Address -
                    <input type='text' name="address" onChange={update} value={data.address} required />
                </label>

                <label className="gender"> Gender -
                    <input type="radio" value="Male" onClick={update} name="gender" /> Male
                    <input type="radio" value="Female" onClick={update} name="gender" /> Female
                    <input type="radio" value="Other" onClick={update} name="gender" /> Other
                </label>

                <label> D.O.B -
                    <input type='date' name='dob' onChange={update} value={data.dob} required />
                </label>
                <label> About -
                    <input type='text' name="about" onChange={update} value={data.about} required />
                </label>
                <label className="upload"> Avatar -
                    <input name="image" className="upload" type='file' onChange={update} required />
                </label>
                <input type='submit' className="profile-submit" />
            </form>
        </div>
    )
}