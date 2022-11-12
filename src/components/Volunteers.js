export default function Stray(props){
    return(
        <div className="stray-box">
            <img className="stray-img" src={props.imgsrc}
                alt="stray-photo" />
            <div className="about-stray">
                <h3>{props.name}</h3>
                <h5>{`+91 ${props.contact}`}</h5>
            </div>
        </div>
    )
}