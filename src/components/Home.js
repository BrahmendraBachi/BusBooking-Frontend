import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import busService from '../service.js/busService';
import Buses from './Buses';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import userService from '../service.js/userService';
import '../App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header1';


const Home = () => {

  const [buses, setBuses] = useState([])
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [sample, setSample] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [errors, setErrors] = useState({
    start: "",
    end: "",
    date: ""
  });

  useEffect(() => {
    console.log("UserPage is Triggered")
    userService.getUserById(id).then((response) => {
      setUsername(response.data.username);
    }).catch(error => {
      console.log(error);
    })
  }, [])



  const validate = (e) => {

    e.preventDefault()
    var count = 0;
    var dum = {}
    if (isNotEmpty(start)) {
      count++;
      dum.start = "*** This field is required ***";
    }
    if (isNotEmpty(end)) {
      count++;
      dum.end = "*** This field is required ***";
    }

    if (isNotEmpty(date)) {
      count++;
      dum.date = "*** This field is required ***";
    }

    if (count === 0) {
      var data = { start, end, date };
      viewBuses(data);
    }
    else {
      setErrors(dum);
    }

  }

  const isNotEmpty = (varString) => {
    return varString.length === 0
  }

  const viewBuses = (data) => {
    busService.getBuses(data).then((response) => {
      if (response.data.length == 0) {
        toast.success("No buses available from this boarding and destination point", { autoClose: 2000 });
      }
      else {
        toast.success(
          (response.data.length === 1) ? "1 Bus available" : response.data.length
            + " Buses availabale", { autoClose: 2000 }
        );
      }
      setBuses(response.data);
    }).catch(error => {
      console.log(error);
      if (error.message === "Network Error") {
        toast.error("OOPS!!! It seems like no backend servers are available", { position: "top-center" });

      }
      else {
        toast.error("OOPS!!! It seems like some error has occured in the internal server", { autoClose: 2000, position: "top-center" })
        setBuses([]);
      }
    })
  }

  const AvailableBusRoutes = () => {
    if (buses.length == 0) {

      return (
        <div>
          <div className='container p-5' >

            <div className='text-center'><h3 className='text-danger'>Bus 1432</h3>
              <b>
                Bangalore --{'>'} Chikkaballapur --{'>'} Bagepally --{'>'} Penugonda --{'>'} Anantapur --{'>'} Gutty --{'>'} Dhone --{'>'} Jedcharla --{'>'} Hyderabad
              </b>
            </div>

            <div className='text-center p-3'><h3 className='text-danger'>Bus 6069</h3>
              <b>Ongole --{'>'} Singaray konda --{'>'} Kavali --{'>'} Nellore --{'>'} Buchireddypalem --{'>'} Sangam --{'>'} Nellorepalem bypass --{'>'} Badvel --{'>'} Mydkur --{'>'} Proddutur --{'>'} Jammalamadugu --{'>'} Kolimigundla --{'>'} Tadipatri --{'>'} Anantapur --{'>'} Sri krishnadevaraya --{'>'} Bathalapalli --{'>'} Dharmavaram --{'>'} Kothacheruvu --{'>'} Puttaparthi</b>
            </div>

            <div className='text-center p-3'><h3 className='text-danger'>Bus 6701</h3>
              <b>
                Anantapur --{'>'} Nagasamudram gate --{'>'} Penukonda depot --{'>'} Bagepalli --{'>'} Chikkaballapura --{'>'} Brindavan hotel --{'>'} Devanahalli --{'>'} Bangalore
              </b>
            </div>

            <div className='text-center p-3'><h3 className='text-danger'>Bus 7080</h3>
              <b>
                Bangalore --{'>'} Chikkaballapur --{'>'} Bagepally --{'>'} Penugonda --{'>'} Anantapur --{'>'} Gutty --{'>'} Dhone --{'>'} Jedcharla --{'>'} Hyderabad
              </b>
            </div>

            <div className='text-center p-3'><h3 className='text-danger'>Bus 4494</h3>
              <b>
                Bangalore --{'>'} Coimbatore
              </b>
            </div>

          </div>
        </div>)

    }
  }


  const goToBusesPage = () => {
    if (buses.length > 0) {
      const viewSeats = {}
      for (let i = 0; i < buses.length; i++) {
        var busId = buses[i].buses.busId;
        viewSeats[busId] = false;
      }
      var data = { buses, id, viewSeats };
      return (<Buses busData={data} />)
    }

  }

  // const myBookings = () => {
  //   if (sample == 0) {
  //     return <Link to={`/mybookings/${id}`} className='btn btn-link'> My Bookings </Link>
  //   }
  // }

  // const check = () => {
  //   console.log("Home is Triggered")
  // }

  const setDateString = (date) => {
    let date1 = new Date(date);
    var month = date1.getMonth() + 1;
    var monthString = month < 10 ? "0" + month : month.toString();
    var day = date1.getDate();
    var dayString = day < 10 ? "0" + day : day.toString();
    var yearString = date1.getFullYear().toString();
    var dateString = yearString + "-" + monthString + "-" + dayString;

    setDate(dateString);
    setSelectedDate(date);
  }

  return (
    <div>
      <div className='container-style2' >
        <Header data={id} />
        <div className='SearchBus'>
          <div className='p-2'></div>
          <div className='p-2'></div>
          <div className='p-2'></div>
          <div className='container'>
            <div className="side-by-side">
              <div className='container'>
                <label className="form-label text-danger"> Boarding Point </label>
                <input
                  type="text"
                  placeholder="Boarding Point"
                  name="start"
                  className="form-control"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                >
                </input>
                <small className='text-danger'> {errors.start} </small>
              </div>
              <div className='container'>
                <label className="form-label text-danger"> Destination Point </label>
                <input
                  type="text"
                  placeholder="Destination Point"
                  name="end"
                  className='form-control'
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                >
                </input>
                <small className='text-danger'> {errors.end} </small>
              </div>
              <div className='container'>
                <label className="form-label text-danger"> Journey Date </label>
                <DatePicker selected={selectedDate} onChange={(date) => setDateString(date)}
                  dateFormat="dd-MM-yyyy"
                  minDate={new Date()}
                  placeholderText="dd-mm-yyyy">
                </DatePicker>
                <small className='text-danger'> {errors.date} </small>
              </div>
            </div>
            <p />
            <div className='text-center'>
              <button className="btn btn-success" onClick={(e) => validate(e)} > View Buses </button>
            </div>
          </div>
          {
            AvailableBusRoutes()
          }
          {
            goToBusesPage()
          }
        </div>
        <div className='p-5'></div>
        <div className='p-5'></div>
        <div className='p-5'></div>
        <div className='p-4'></div>
      </div>
    </div>
  )
}

export default Home
