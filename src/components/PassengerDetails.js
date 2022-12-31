import { useNavigate } from 'react-router-dom';
import {React, useState} from 'react'
import { useLocation } from 'react-router-dom'
import busService from '../service.js/busService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

const PassengerDetails = () => {
 const location = useLocation();
 var data = location.state.Data;
 console.log(data)
 var bookedSeats = data.bookedSeats;
 var date = data.date;
 var busId = data.busId;
 var indexes = data.indexes;
 var id = data.id;
 const navigate = useNavigate();
 var options = [{"label" : "Male", "value" : "M"}, {"label" : "Female", "value" : "F"}, {"label" : "Other", "value" : "O"}]

 console.log("Length:"+bookedSeats.length);
 console.log(bookedSeats);

 const [message, setMessage] = useState('')

 var passengerDetails = []
 for(let i=0;i<bookedSeats.length;i++)
 {
  var dum = {}
  dum.id = bookedSeats[i];
  dum.name = '';
  dum.age = 0;
  dum.gender = "";
  passengerDetails.push(dum);
 }



 const setPassengerGender=(value, id)=>{
  console.log("Gender:" + value);
  for(let i=0;i<passengerDetails.length;i++)
  {
   if(passengerDetails[i].id == id)
   {
    passengerDetails[i].gender = value;
   }
  }
 }

 const setPassengerName=(value, id)=>{
  for(let i=0;i<passengerDetails.length;i++)
  {
   if(passengerDetails[i].id == id)
   {
    passengerDetails[i].name = value;
   }
  }
 }

 const setPassengerAge=(value, id)=>{
  for(let i=0;i<passengerDetails.length;i++)
  {
   if(passengerDetails[i].id == id)
   {
    passengerDetails[i].age = value;
   }
  }
 }

 const BookSeats=(e)=>{
  e.preventDefault();

  var isValid = true;
  
  for(let i=0;i<passengerDetails.length;i++)
  {
    console.log(passengerDetails[i]);
    if((passengerDetails[i].age === 0) || (passengerDetails[i].name.length == 0))
    {
      isValid = false;
      break;
    }
  }
  if(!isValid){
    setMessage("OOPS Error happend");
    console.log(passengerDetails);
  }
  else
  {
    data.passengerDetails = passengerDetails;
    busService.bookBusTickets(data).then((response)=>{
     console.log(response.data);
     toast.success("Tickets Booked Successfully", {autoClose : 2000});
     toast.loading("Redirecting to Home Page", {autoClose : 2000});
     timer();
    })
  }
 }

 const timer=()=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
      toast.dismiss();
      navigate(`/userPage/${id}`);
  }, 2000);
  return () => clearTimeout(timer);
  }

  return (
    <div>
      <div className = "container">
                <div className = "row">
                    <div className = "card col-md-7 offset-md-3 offset-md-3">
                      <medium className='text-center'>{message}</medium>
                      <div className='p-1'></div>
                       <h2 className='text-center text-warning'> Enter Passengers details </h2>
                       <form>
                       <div className = "form-group mb-2">
                       {
                          passengerDetails.map(
                           passenger=>(
                           <tr key={passenger.id}>
                               <h2>Passenger details for seatNo {passenger.id}</h2>
                               <div className = "form-group mb-2">
                                   <label className = "form-label strong">Name *</label>
                                  <input
                                    type = "text"
                                    placeholder = "Enter passenger Name"
                                    className = "form-control"
                                    onChange = {(e) => setPassengerName(e.target.value, passenger.id)}
                                  >
                                  </input>
                               </div>
                               <div className='p-1'></div>
                               <label className = "form-label"> Age * </label>
                               <input
                                  type = "number"
                                  placeholder = "Enter passenger Age"
                                  className = "form-control"
                                  onChange = {(e) => setPassengerAge(e.target.value, passenger.id)}
                               >
                                </input>
                               <div className='p-1'></div>
                               <label className = "form-label"> Select Gender: </label>
                                    <select className='text-align-center' onChange={(e)=>{

                                     setPassengerGender(e.target.value, passenger.id);

                                    }}>
                                     {options.map((option) => (<option value={option.value}>{option.label}</option>))}
                                    </select>
                               <div className='p-3'></div>
                               </tr>
                             )
                          )
                         }
                         <button className='btn btn-primary text-center' onClick={(e)=>{BookSeats(e)}}>Book Seats</button>
                         <button className='btn btn-danger text-center' onClick={()=>navigate(`/userPage/${id}`)}>Cancel</button>
                        </div>
                       </form>
                     </div>
                  </div>
        </div>
    </div>
  )
}

export default PassengerDetails
