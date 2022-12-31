import React, { useState } from 'react'
import busService from '../service.js/busService';
import {useNavigate, useParams} from 'react-router-dom';
import userService from '../service.js/userService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


const Login = () => {

 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 var [message, setMessage] = useState('');
 const navigate = useNavigate();


 const check=(e)=>{
  e.preventDefault();

  var credentials = {username, password};
  console.log(credentials);
  userService.checkUser(credentials).then((response)=>{
    console.log("Response data");
   console.log(response.data);
   navigate(`/userPage/${response.data.id}`);
  }).catch(error=>{

    console.log(error);
    console.log(error.config.message == "Network Error")

    if(error.message == "Network Error"){
        toast.error("OOPS!!! It seems like no backend servers are available", {position : 'top-center'});
    }
   setMessage("Bad Credentials!!! Username or Password is Incorrect");
  })
 }

 const Register=()=>{
  navigate("/register");
 }

  return (
    <div>
     <div className='p-5'></div>
     <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       <h2 className = "text-center">Login Page</h2>
                        <div className = "card-body">
                         <small className='text-danger'>{message}</small>
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Username </label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter your username"
                                        name = "username"
                                        className = "form-control"
                                        value = {username}
                                        onChange = {(e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type = "password"
                                        placeholder = "Enter your password"
                                        name = "password"
                                        className = "form-control"
                                        value = {password}
                                        onChange = {(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => check(e)} > Log in  </button>
                                <button className = "btn btn-link" onClick = {(e) => navigate(`/forgot-password`)} > forgot password? </button>
                                <p />
                                <h4 className='text-center'>New User?</h4>
                                 <div className='p-1'></div>
                                 <div className='text-center'>
                                    <button className = "btn bg-white text-danger btn-primary" onClick = {() => Register()} > Register </button>
                                 </div>
                                 {/* <button className = "btn btn-primary" onClick = {() => Register()} > Register </button>
                                 */}
                            </form>

                        </div>
                    </div>
                </div>

           </div>
           <div className='p-5'></div>
           <div className='p-5'></div>
    </div>
  )
}

export default Login
