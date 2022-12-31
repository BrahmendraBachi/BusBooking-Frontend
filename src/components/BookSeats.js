import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../Grid.css';
import ShowSeats from './ShowSeats';
import ConfirmBook from './ConfirmBook';


const BookSeats = ({data}) => {

 const [bookedSeats, setBookedSeats] = useState([]);
 const [allseats, setSeats] = useState(data.allSeats);
 const [tickets, setTickets] = useState(data.bookedSeats);
 const [date, setDate] = useState(data.date);
 const [busId, setBusId] = useState(data.busId);
 const [indexes, setIndexes] = useState(data.indexes);
 const [id, setId] = useState(data.id);
 const[message, setMessage] = useState('')
 const[count, setCount] = useState(bookedSeats.length)

 const navigate = useNavigate();
 

 //Activates to cancel the instant booked seats
 const cancelMySeats=(num)=>{

  setBookedSeats(current =>
      current.filter(element => {
        return element !== num;
      }),
    )
  console.log(bookedSeats);
  setCount(prevState => prevState - 1);
  console.log(count);

 }


 //Will add Seats to bookedSeats variable that you have instantly clicked
 const editMySeats=(num)=>{

  setBookedSeats(prev => [...bookedSeats, num]);
  console.log(bookedSeats);
  setCount(prevState => prevState + 1);
  console.log(count);

 }
 
 //Checks seat no is booked or not
 const isBooked=(num)=>{
  console.log(tickets);
  console.log(bookedSeats);

  //Check seat no is already booked or not
  if(tickets.includes(num, 0))
  {
    return (
     <div>
      <div className='Grid1'></div>
     </div>
     )
  }
  
  // Cancels instant booked seats
  else if(bookedSeats.includes(num,0)){
    return (
      <div>
        <button  className='buttonSize2' onClick={()=> cancelMySeats(num)}>
          <p className='textCenter'>{num}</p>
        </button>
      </div>
    )
  }

  // Books seats instantly
  else
  {
  return (
    <div>
       <button  className='buttonSize1' onClick={()=> editMySeats(num)}>
          <p ></p>
       </button>
    </div>
   )
  }
 }

 //Gives option for Booking
 const Book=()=>{

  if(count > 1)
  {
   return <button className = "btn btn-danger" onClick = {() => BookSeatsSubmit()} > Book {count} Seats </button>
  }

  if(count === 1)
  {
    return <button className = "btn btn-danger" onClick = {() => BookSeatsSubmit()} > Book {count} Seat </button> 
  }

 }

 // Navigates to Passenger Details Page
 const BookSeatsSubmit=()=>{

  var data = {bookedSeats, date, busId, indexes, id, count}
  console.log(data);
  navigate(`/passenger-details/${id}`,{state:{Data : data}});

 }


  return (
    <div>
      <h2 className='text-center text-danger'> Book Your Seats </h2>
      <h2 className='text-center text-primary'>{message}</h2>
       <div className='container-style'>
        <div className='mb-2'>
        <div className='p-1'></div>
        <ShowSeats checkBooked = {isBooked} AllSeats = {allseats}/>
      </div>
      <div className='p-1'></div>
       <ConfirmBook confirm = {Book} />
      </div>
      <div className='p-2'></div>
    </div>
  )
}

export default BookSeats