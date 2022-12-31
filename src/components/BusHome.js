import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
const BusHome = () => {

  

  return (
    <div>
      <div className='p-1'></div>
      <h2 className='text-center'> Bachi Bus Booking App </h2>
      <div className='container2'>
       <img src='https://shutr.bz/3x0QD9J' style={{"width" : '1140px', 'marginLeft' : "20px", 'marginRight' : '20px'}} className='bus-image'></img>
      </div>
      <div className='p-1'></div>
      <div className='text-center text-danger'>
       <Link to="/log-in" className='btn btn-danger'> Log in </Link>
     </div>
     <div className='p-5'></div>
    </div>
  )
}

export default BusHome
