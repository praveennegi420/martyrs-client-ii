import { useState, useEffect } from "react"
import axios from "axios"
import Volunteers from '../components/Volunteers'

export default function Volunteer() {

    const [display, setDisplay] = useState([])
    const [page, setPage] = useState(1)

    const fetchData = async () => {
        try {
            const data = await axios.get('http://localhost:8000/volunteer', {
                params: { page }
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

    const prevPage = () => {
        setPage(prev => prev > 1 ? prev - 1 : 1)

    }

    const nextPage = () => {
        setPage(prev => display.length === 0 ? prev : prev + 1)
    }

    let id = 0
    const displayData = display.map(datauni => {
        return <Volunteers key={id++} imgsrc={datauni.avatar.url} name={datauni.name} contact={datauni.contact} />
    });

    return (
        <>
            <div className="help-top">
                <h1>Be a change maker.</h1>
                <p>"If you take in a starving dog and make sure it thrives, it will not bite you - This is the fundamental difference between dogs and humans."</p>
            </div>
            <div className="all-stray">
            { display.length === 0 ? <div className='unavailable'>{page===1 ?<h2>Loading ...</h2> : <h2>Posts Unavailable</h2> } </div> : displayData}
            </div>

            <div className="page-change" >
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuuHB5g-X20QfRtQkQPzaggBbnCUPu57oHOMG6LQ&s' alt='prev' onClick={prevPage} />
                <img src='https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/next-icon.png' alt='prev' onClick={nextPage} />
            </div>

            <div className="help-end">
                <div className="form-aside">
                    <h2>Be a Volunteer.</h2>
                    <p>If you care for animals and other creatures that we share this earth with and would like to contribute your efforts that could have a multiplier effect in building a compassionate society in India, come join us as a volunteer.</p>
                </div>
            </div>
        </>
    )
}