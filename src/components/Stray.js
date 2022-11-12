export default function Stray(props){
    
    const Delete= () =>{
        if(props.delete===1) return ( <><img className="delete" src='https://findicons.com/files/icons/1262/amora/128/delete.png' alt='delte' onClick={()=>{props.handleClick(props.id)}} /> </> )
        return (<></>)
    }

    return(
        <div className="stray-box" onClick={()=>{props.postClick(props.id)}}>
            <Delete/>
            <img className="stray-img" 
               src={props.imgsrc}
                alt="stray-photo" />
            <div className="about-stray">
                <h3>{props.location}</h3>
                <h5>{`${props.contact}`}</h5>
            </div>
        </div>
    )
}