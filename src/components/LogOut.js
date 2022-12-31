import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import '../App.css'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const LogOut = () => {
 const navigate = useNavigate()
 const Log_Out=()=>{
  console.log("Clear");
  toast.loading("logging you out, redirecting to login page", {position : 'top-center'});
  timer();
 }
 
 const timer=()=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
     toast.dismiss();
     localStorage.clear();
     toast.success("Logged you out successfully", {position : 'top-center', autoClose : 1500});
     navigate("/log-in");
  }, 2000);
  return () => clearTimeout(timer);
  }

  return (
    <div>
     <div className='end'>
      <p className='btn btn-light text-dark' onClick = {() => Log_Out()}>
         <b>Log Out</b> 
      </p>
     </div>
    </div>
  )
}

export default LogOut
