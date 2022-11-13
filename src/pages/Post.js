import '../styles/Post.css'
import { Link, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Post(){
    const navigate= useNavigate()
    const location= useLocation()

    function verifyPost(id){
        axios.post('http://localhost:8000/verifypost',{id})
        .then(res => navigate('/profile'))
        .catch(err => console.log(err))
    }

    const Verify = () =>{
        return (
            <button className="submit" onClick={()=>{verifyPost(location.state.data._id)}}>Verify Blog</button>
        )
    }

    return(
        <>
        <div className="container" style={{margin:' 50px auto'}}>
          <h1>{location.state.data.location}</h1>
          <div className='sec-container'>
            <div className='img-name'>
            <img src={location.state.data.img.url} alt=''   className="blog-img"/>
        
             <h3 className='details place'>{location.state.data.contact}</h3>
            </div>
            <div className='details-para'>
            <p>{location.state.data.about}</p>
            </div>
          </div>
          <div>
      {  location.state.user.user==='iamadmin' && !location.state.data.verified ? (
        <Verify/>
      ) : (
        <></>
      )}
    </div>
        </div>
        </>
    )
}