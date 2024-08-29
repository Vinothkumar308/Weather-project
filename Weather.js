import React from 'react'
import './Weather.css'
import {useState,useEffect} from 'react'


function Createinner({text,degree,city,country,latitude,longitude,humidity,wind}){
    return (
      <div>
         <div className='imgline'><img src="sun.png" alt="" /></div>
         <div className="p">
          <p>{degree}°c</p>
          <p>{text}</p>
          <p>{country}</p>
         </div>
         <div className="log-lag">
          <div className='latitude'>
            <span>latitude</span>
            <p>{latitude}</p>
          </div>
          <div className='longitude'>
            <span>longitude</span>
            <p>{longitude}</p>
          </div>
        </div>
        <div className="hum-wind">
          <div className='humidity'>
          <i className="fa-solid fa-bars"></i>
          <div className='h'>
            <p>{humidity}%</p>
            <p>humidity</p>
          </div>
          </div>
          <div className='wind'>
          <i className="fa-solid fa-wind"></i>
          <div className='w'>
            <p>{wind} Km/h</p>
            <p>wind speed</p>
          </div>
          </div>
        </div>
        
      </div>
    )
}




export const Color = () => {
  
   
  const [text,setText] = useState('london')
  const [degree,setDegree] = useState(0)
  const [city,setCity] = useState('london')
  const [country,setCountry] = useState(0)
  const [latitude,setLatitude] = useState(0)
  const [longitude,setLongitude] = useState(0)
  const [humidity,setHumidity] = useState(0)
  const [wind,setWind] = useState(0)
  const [cityNotfound,setCityNotfound] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState()
 

  const search = async()=>{
    setLoading(true)
    let apikey = "c56007401cb51c772d01f84a626dbb43"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`
    //Add api in the url
   
    try{
      
      let res = await fetch(url)
      let data = await res.json()
      if(data.cod=="404"){
        setCityNotfound(true)
        setLoading(false)
        return
      }
      setDegree(Math.floor(data.main.temp))
      setLatitude(data.coord.lat)
      setLongitude(data.coord.lon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)
      setCityNotfound(false)
    }
    catch(error){
      console.log(error.message)
      setError("this is not valid")
    }finally{
      setLoading(false)
    }
    
  }
  function handleChange(e){
    setText(e.target.value)
    }

  const handleKeydown = (e)=>{
    if(e.key=="Enter"){
      search()
  }
  }
  useEffect(function(){
    search()
  },[])

  return (
    <div className='container'>
      <div className="input-search">
          <input type="text"
          placeholder="Search City"
          autoFocus
          id="input"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeydown}
           /> 
           <div className="imgcon"
           onClick={()=>search()}
           ><i className="fa-solid fa-magnifying-glass"></i></div>
      </div>
      
      {loading && <div className="loading-message">loading...</div>}
      {error && <div className='error'>{error}</div>}
      {cityNotfound && <div className='city-not-found'>city not found</div>}

      {!loading && !cityNotfound &&
      <Createinner
      text={text}
      degree={degree}
      city={city}
      country={country}
      latitude={latitude}
      longitude={longitude}
      humidity={humidity}
      wind={wind}
      />}

  <p className="design">designed by <b>vino</b></p>
    </div>
  )
}
