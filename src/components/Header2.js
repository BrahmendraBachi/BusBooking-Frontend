import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import LogOut from './LogOut'


const Header2 = () => {
  return (
    <div>
     <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div>
            <h1 className="navbar-brand text-dark">Bachi Bus Booking App</h1>
          </div>
          <div>
            <ul class="navbar-nav me-auto mb-2">
              <li clasName="nav-item"><Link to={`/Login/${"admin"}`} className='btn btn-dark text-light'>Log in</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     </header>
    </div>
  )
}
export default Header2