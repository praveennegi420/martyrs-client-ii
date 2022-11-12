import { useState, useEffect } from "react"
import axios from "axios"
import Stray from "../components/Stray"
import '../styles/Help.css'
import { useNavigate } from 'react-router-dom'

export default function Help() {
    const dataContent = { location: '', contact: '', about: '', image: { name: '', file: null } }
    const [display, setDisplay] = useState([])
    const [data, setData] = useState(dataContent) 
    const [page, setPage] = useState(1)
    const navigate= useNavigate()

    const fetchData = async () => {
        try {
            const data = await axios.get('http://localhost:8000/help', {
                params: {
                    page
                }
            });
            return data.data;
        } catch (err) {
            console.log('err')
        }
    }

    useEffect(() => {
        fetchData()
            .then(data => setDisplay(data))
            .catch(err => console.log('ERROR OCCURED'));
    }, [page])

    function update(event) {

        const { name, value, files } = event.target
        setData(prev => {
            if (files) return { ...prev, [name]: { file: files[0], name: value } }
            return { ...prev, [name]: value }
        })

    }

    function submitdata(e) {
        e.preventDefault()

        const fileReader= new FileReader()
        fileReader.readAsDataURL(data.image.file)

        fileReader.onload= () => {
            const fileURL= fileReader.result
            const config = { headers: { "content-type": 'application/json' } }
            axios.post('http://localhost:8000/help', {
                location: data.location,
                contact: data.contact,
                about: data.about,
                fileURL,
                token: localStorage.getItem('token')
            }
                , config)
                .then(res => {
                    if (res.data.status === 'error') alert(res.data.message)
                    else {
                        window.location.reload()
                    }
                })
                .catch((err) => alert('Login to upload Credentials'));

        }
    }

    const prevPage = () => {
        setPage(prev => prev > 1 ? prev - 1 : 1)

    }
    
    const nextPage = () => {
        setPage(prev => display.length===0 ? prev : prev + 1)
    }

    const openPost = (id) =>{
        console.log('clicked')
        axios.post(`http://localhost:8000/post/${id}`,{token: localStorage.getItem('token')})
        .then(res => navigate('/post', {state:{data:res.data.post, user:''}}))
        .catch(err => console.log(err))
    }

    const displayData = display.map(datauni => {
        return <Stray key={datauni._id} id={datauni._id} imgsrc={datauni.img.url} location={datauni.location} contact={datauni.contact} name={display.name}  postClick={openPost}/>
    });

    return (
        <>
            <div className="help-top">
                <h1>Down the memory lane</h1>
                <p className="quote">Nation thrives on the sacrifices of these immortals. Let's commemorate them & inspire the comming generations.</p>
            </div>

            <div className="all-stray">
                { display.length === 0 ? <div className='unavailable'>{page===1 ?<h2>Loading ...</h2> : <h2>Posts Unavailable</h2> } </div> : displayData}
            </div>

            <div className="page-change" >
            <button className="next-prev-btn" onClick={prevPage}>{'<'}</button>
                <button className="next-prev-btn" onClick={nextPage}>{'>'}</button>
            </div>


            <div className="help-end">
                <form id="form" onSubmit={submitdata} method='post' encType="multipart/form-data">
                    <label >Name:
                        <input className="form-input" type='text' name="location" placeholder="Martyr's Name" value={data.location} onChange={update} required />
                    </label>

                    <label >Place:
                        <input className="form-input" type='text' name="contact" placeholder="Hometown" onChange={update} value={data.contact} required />
                    </label>

                    <label className="text-area">Article: 
                    </label>
                    <textarea type='textarea'rows="10" cols="50" name="about" value={data.about}
                      placeholder="write your post here" onChange={update} />

                    <label className="upload">Upload Photo
                        <input name="image" type='file' className="upload" onChange={update} required />
                    </label>

                    {/* <input type='submit' className="submit" /> */}
                    <button type="submit" className="submit">submit</button>
                </form>
                <div className="form-aside">
                    <h2>Make our heroes immortal</h2>
                    <p>Nothing is more valuable to a soldier other than seeing people they protect having respect and gratitude for them. Show your gratitude by showcasing your writings.</p>
                </div>
            </div>
        </>
    )
}