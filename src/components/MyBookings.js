import React, { Children, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import busService from '../service.js/busService';
import userService from '../service.js/userService';
import LogOut from './LogOut';
import Popup from './Popup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Popup.css'
import Header from './Header1';



toast.configure();

const MyBookings = () => {

 const navigate = useNavigate()

 const {id} = useParams();
 const [tripId, setTripId] = useState(0)
 const [trips, setTrips] = useState([])
 const [username, setUsername] = useState('');
 const [which, setWhich] = useState(-1);
 const [popup, setPopup] = useState(false);
 const [trigger, setTrigger] = useState(false);
 const [download, setDownload] = useState(false);
 const [tripHeading, setTripHeading] = useState('')

 useEffect(() => {
  userService.getUserById(id).then((response)=>{
    setUsername(response.data.username);
  }).catch(error=>{
    console.log(error);
  })
 }, [])

 const getTripsCompleted=()=>{
  setTripHeading("Trips Completed")
  setWhich(0);
  userService.getTripsCompleted(id).then((response)=>{
   setTrips(response.data);
  }).catch(error=>{
   console.log(error);
  })
 }

 const getTripsOnLive=()=>{
  setTripHeading("Trips On Live")
  setWhich(0);
  userService.getTripOnLive(id).then((response)=>{
   setTrips(response.data);
  }).catch(error=>{
   console.log(error);
  })
 }

 const getUpcomingTrips=()=>{
  userService.getUpcomingTrips(id).then((response)=>{
   setTripHeading("Upcoming Trips");
   setWhich(1);
   setTrips(response.data);
  }).catch(error=>{
   console.log(error);
  })
 }

 const cancekBooking=(id)=>{
  
  busService.cancelBooking(id).then((response)=>{
    toast.success("Ticket Cancelled Successfully", {autoClose :2000});
    setTrips(response.data);
    setPopup(false);
  }).catch(error=>{
    console.log(error);
  })
 }

 const ispopup=(id)=>{
  if(popup)
  {
    return (
      <div className="popup">
      <div className='popup-inner'>
          <button className='close-btn' onClick={()=> setPopup(false)}>x</button>
          <h3 className='text-danger'>Would you really want to cancel Booking?</h3>
          <div className='side-by-side1'>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-2'></div>
            <button className='btn btn-success' onClick={()=>{cancekBooking(id)}}>yes</button>
            <div className='p-3'></div>
            <button className='btn btn-danger' onClick={()=>setPopup(false)}>no</button>
          </div>
      </div>
    </div>
    )
  }
 }

 const isDownload=(trip)=>{
  if(download)
  {
    return (
      <div className="popup">
      <div className='popup-inner'>
          <button className='close-btn' onClick={()=> setDownload(false)}>x</button>
          <h3 className='text-danger'>Would you want to download the Ticket?</h3>
          <div className='side-by-side1'>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-4'></div>
            <div className='p-2'></div>
            {/* <div className='p-1'></div>
            <div className='p-1'></div>
            <div className='p-2'></div>
            <div className='p-2'></div> */}
            <button className='btn btn-success' onClick={()=>{downloadTicket(trip)}}>yes</button>
            <div className='p-3'></div>
            <button className='btn btn-danger' onClick={()=>setDownload(false)}>no</button>
          </div>
      </div>
    </div>
    )
  }
 }

 const downloadTicket = (trip)=>{
  toast.success("Ticket Downloadwd Successfully", {autoClose : 2000})
  setDownload(false);
  const element = document.createElement("a");
    var nameText = "Passenger Name        :   " + trip.name;
    var busIdText = "Bus Name             :   " + trip.busId;
    var jDateText = "Journey Date         :   " + trip.date;
    var sNoText = "Seat No                :   " + trip.seatNo;
    var bPointText = "Boarding Point      :   " + trip.sPlace;
    var bTimeText = "Start Time           :   " + trip.sTime;
    var dPointText = "Destination Point   :   " + trip.ePlace;
    var dTimetext = "Arrival Time         :   " + trip.etime;
    const downloadText = nameText + "\n" + busIdText + "\n" + jDateText + "\n" + sNoText + "\n" + bPointText + "\n" + bTimeText + "\n" + dPointText + "\n" + dTimetext;
    const file = new Blob([downloadText], {
      type: "text/plain"
    });

    element.href = URL.createObjectURL(file);
    element.download = "ticket.txt";
    document.body.appendChild(element);
    element.click();
  }
 const check=(trip)=>{
  if(which == 1)
  {
    return (
      <div>
        <button className='btn btn-danger' onClick={()=>setPopup(true)}>Cancel</button>
        <button className='btn btn-success' onClick={()=>setDownload(true)}>Download</button>
        {
          ispopup(trip.id)
        }
        {
          isDownload(trip)
        }
      </div>
      )
  }
 }

 
 const checkTrips=()=>{
  if(trips.length>0)
  {
   return (
    <div>

     <div className='container-style2'>
     {
      <table className="table table-borderless">
       <thead>
        <th></th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial"}}> Name </th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial", "maxWidth" : "70px"}}> Bus Id </th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial", "maxWidth" : "70px"}}> Date of Journey </th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial", "maxWidth" : "70px"}}> Seat No </th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial", "maxWidth" : "70px"}}> Boarding Point </th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial", "maxWidth" : "70px"}}> Boarding Time </th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial", "maxWidth" : "70px"}}> Destination </th>
        <th className='text-primary text-center' style={{"fontFamily" : "-moz-initial", "fontStyle" : "-moz-initial","maxWidth" : "70px"}}> Arrival Time </th>
        <th></th>
       </thead>
       <div className='p-3'></div>
       <tbody>
        {
         trips.map(
          trip=>(
           <tr key={ trip.id }>
            <td><img src='https://bit.ly/3dU4SGN' className='img'></img></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.name } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.busId } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.date } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.seatNo } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.splace } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.stime } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.eplace } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace", "maxWidth" : "70px"}}><strong> { trip.etime } </strong></td>
            <td className='text-center text-secondary' style={{"fontFamily" : "monospace"}}>
            {
              check(trip)
            }
            </td>
           </tr>
          )
         )
        }
       </tbody>
      </table>
     }
    </div>
    </div>
   )
  }
  else{
    if(which != -1){
      return (
      <h1 className='text-center text-danger'>No Trips availabale</h1>
    )
    }
  }
 }


  return (
    <div className='container-style2'>
      <Header data = {id}/>
     {/* <LogOut />
     <button className='btn btn-link' onClick={() => navigate(-1)}>Back</button>
     <div className='container'>
      <div className='text-center'>
        <img src='https://bit.ly/3KsMlxh' className='profile'></img>
        <div className='p-2'></div>
        <h4 className='text-primary'>{username}</h4>
      </div>
     </div> */}
      <div className='container'>
       <h2 className='text-center text-warning' style={{'marginRight' : '50px'}}>My Bookings</h2>

       <div className='p-3'></div>

       <div className='side-by-side'>
        <div className='p-5'></div>
        <div>
         <button className='btn btn-warning' onClick={()=>getTripsCompleted()}>Trip Completed</button>
        </div>
        <div className='p-5'></div>
        <div className='p-5'></div>
        <div className='p-4'></div>
        <div>
         <button className='btn btn-warning' onClick={()=>getTripsOnLive()}>Trips On Live</button>
        </div>
        <div className='p-5'></div>
        <div className='p-5'></div>
        <div className='p-4'></div>
        <div>
         <button className='btn btn-warning' onClick={()=>getUpcomingTrips()}>Upcoming Trips</button>
        </div>
       </div>
       <div>
        <h2 className='text-center'>{tripHeading}</h2>
        <div className='p-4'></div>
       {
        checkTrips()
       }
       </div>
       <div className='p-5'></div>
      </div>
    </div>
  )
}

export default MyBookings
