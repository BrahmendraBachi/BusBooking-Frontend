import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import LogOut from './LogOut'
// import LogOut from './LogOut'


const Header = ({data}) => {

// const id = data.id

// console.log(data)
  return (
    <div>
     <header>
      {/* navbar navbar-expand-lg navbar-light bg-light */}
      {/* <div className='p-1'></div> */}
      <nav className="navbar navbar-expand-lg">
        <div class="container-fluid">
          <div>
            <div className='p-2'></div>
            <h1 className="">Bachi Bus Booking App</h1>
          </div>
          <div>
            <div className='p-2'></div>
            <ul class="navbar-nav me-auto mb-2">
              <li clasName="nav-item"><Link to={`/userPage/${data}`} className='btn btn-light  text-dark'><b>Home</b></Link>
              </li>
              <div className='p-2'></div>
              <li clasName="nav-item"><Link to={`/myBookings/${data}`} className='btn btn-light text-dark'><b>My Bookings</b></Link>
              </li>
              <div className='p-3'></div>
              <li className='nav-item'>
                <img src='https://bit.ly/3KsMlxh' className='profile'></img>
              </li>
              <div className='p-3'></div>
              <li className='nav-item'>
                <LogOut />
              </li>
            </ul>
          </div>
        </div>
      </nav>
     </header>
    </div>
  )
}
export default Header