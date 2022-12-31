import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import BusHome from './components/BusHome';
import Login from './components/Login';
import Register from './components/Register';
import PassengerDetails from './components/PassengerDetails';
import MyBookings from './components/MyBookings';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header1';

function App() {
  return (
    <div className='GeeksForGeeks'>
      <div className='text-center text-danger'>
      {/* <h2> Bachi RTC Online Ticket Booking </h2> */}
     </div>
     {/* <div className='p-1'></div> */}
      <Router>
        <Routes>
          <Route path='/' element={<BusHome />}></Route>
          <Route path='/userPage/:id' element={<Home />}></Route>
          <Route path='/log-in' element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/passenger-details/:id" element={<PassengerDetails />}></Route>
          <Route path='/myBookings/:id' element={<MyBookings />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
