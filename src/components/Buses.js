import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';
import React, { useState } from 'react'
import '../App.css';
import BookSeats from './BookSeats';
import Home from './Home';

const Buses = ({busData}) => {
  console.log("Bus Data" )
  console.log(busData);
  var [buses, setBuses] = useState(busData.buses);
  const [id, setId] = useState(busData.id);
  const [mySeats, setMySeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [allSeats, setAllSeats] = useState([]);
  const [date, setDate] = useState('');
  const [busId, setBusId] = useState('');
  const [indexes, setIndexes] = useState('');
  const [sample, setSample] = useState([]);
  

  var formatter = new Intl.NumberFormat('en-US', {
            style : 'currency',
            currency : 'INR',
        })

  const gotoSeatsPage=(busId)=>{
    console.log("Go To seats Pasge");
    console.log(busId);
    console.log(busData.viewSeats[busId]);
    if(allSeats.length!=0 && busData.viewSeats[busId])
    {
      console.log(bookedSeats);
      var allData = {mySeats, bookedSeats, allSeats, date, busId, indexes, id};
      return <BookSeats data={allData} />
    }
  }


 const viewSeats=(vacancySeats, journeyDate, busId, indexValues)=>{
  console.log(busId);
  console.log("View Seats is Triggered");
  console.log(busData.viewSeats);
  if(busData.viewSeats[busId] == false)
  {
    console.log("View Seats Seats");
    busData.viewSeats[busId] = true;
    console.log(busData.viewSeats);
  }
  else{
    busData.viewSeats[busId] = false;
  }
  if(vacancySeats.length == 0)
  {
    return <h2 className='text-danger'> No Available Seats to Book </h2>
  }

  let str = vacancySeats.substring(0, vacancySeats.length-1);

  var dum1 = str.split(",");
  


  var dum2 = [];

  for(let i=1;i<26;i++)
  {
    if ((dum1.includes(i.toString(), 0)) ||  (i.toString()==dum1[dum1.length-1]))
    {
      continue;
    }
    else
    {
      dum2.push(i.toString());
    }
  }

  var dum3 = [['1', '2', '3', '4'], ['5', '6', '7', '8'], ['9', '10', '11', '12'], ['13', '14', '15', '16'], ['17', '18', '19', '20']];

  setMySeats(dum1)
  setBookedSeats(dum2)
  setAllSeats(dum3)
  setDate(journeyDate);
  setBusId(busId);
  setIndexes(indexValues);
 }

  

 const isViewSeats=(bus)=>{

    return (
      <div className='viewSeats'>
        <button className = "btn btn-danger" onClick = {() => viewSeats(bus.vacancySeats, bus.journeyDate, bus.buses.busId, bus.indexes)} > View Seats </button>
      </div>
    )
 }


  return (
    <div>
     <div className='p-3'></div>
     <div className='container'>
      <h2 className='text-primary text-center'> Available Buses </h2>
      <div className='p-3'></div>
      {
       busData.buses.map(
              bus => (
                  <tr key={bus.buses}>
                   <div className='ex1'>
                   <div className='side-by-side'>
                    <img className='img' src="https://bit.ly/3dU4SGN"></img>
                    <div className='p-3'></div>
                    <div className='container-busId'>
                      <h3 className='text-danger'> { bus.buses.busId } </h3>
                    </div>
                    <p />
                    <div className='p-4'> </div>
                    <div className='container-busname'>
                      <h3 className='text-danger'> { bus.buses.busName } </h3>
                    </div>
                    <div className='p-3'> </div>
                    {/* <h5>Start time</h5> */}
                    <div className='container-bustime'>
                      <h3 className='text-warning'> { bus.btime } </h3>
                      <h6 className='text-secondary'> Start time</h6>
                    </div>
                    <div className='p-2'> </div>
                     <div className='container-bustime'>
                      <h3 className='text-warning'> { bus.dtime } </h3>
                      <h6 className='text-secondary'> Arrival</h6>

                     </div>
                     <div className='p-2'> </div>
                    <h3 className='text-danger' style={{"fontFamily" : "fantasy"}}> {formatter.format(bus.cost)} </h3>
                    <div className='p-3'></div>
                    <h3 className='text-info'> {bus.noOfSeats} seats availablle </h3>
                    <div className='p-1'></div>
                    {
                      isViewSeats(bus)
                    }
                   </div>
                   {
                    gotoSeatsPage(bus.buses.busId)
                   }
                   </div>
                   <div className='p-3'></div>
                  </tr>
              )
       )
      }
     </div>
     
    </div>
  )
}

export default Buses
