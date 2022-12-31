import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from '../service.js/userService';


toast.configure();
const ForgotPassword = () => {
 const navigate = useNavigate();
 const [emailId, setEmailId] = useState('');
 const [isPresent, setIsPresent] = useState(false);
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [errors, setErrors] = useState({"password" : '', 'confirmPassword' : ''});

 



  const checkUsername=(e)=>{
   e.preventDefault();
   userService.checkUserByEmailId(emailId).then((response)=>{
    console.log(response.data);
    setIsPresent(true);
    toast.success("Email Id exists");
   }).catch(error=>{
    console.log(error);
    toast.error("OOPS!!! EmailId does not Exists");
   })
  }

  const changePassword=(e)=>{
   e.preventDefault();
   console.log(errors);
   var count = 0;
   var dum = {};
   var data = {password, confirmPassword};
   for(let i in data)
   {
    console.log(errors[i]);
    console.log("length:"+ errors[i].length);
    if(data[i].length == 0 )
    {
     dum[i] = "*** This Field is Required ***";
     count++;
    }
   }
   console.log(count);
   if(count==0)
   {
    if(data.confirmPassword == data.password)
    {
     var newPassword = {"username" : emailId, password};
     gotoChangePassword(newPassword);
    }
    else{
     var dum1 = {}
     console.log("Password not matched");
     dum1.confirmPassword = "*** Password not matched ***";
     dum1.password = "";
     console.log(dum1);
     setErrors(dum1);
    }
   }
   else{
    console.log("Set Errors is Triggered");
    setErrors(dum);
   }
  }

  const gotoChangePassword=(newPassword)=>{
   
   userService.changePassword(newPassword).then((response)=>{
    console.log(response.data);
    toast.success("Password Changed Successfully");
    toast.loading("Redirecting to login page", {position : 'top-center'});
    timer();
   }).catch(error=>{
    console.log(error);
    toast.error("OOPS!!! EmailId is not present");
   })
  }

  const timer=()=>{
  console.log("Cancel is triggered");
    const timer = setTimeout(() => {
     toast.dismiss();
      navigate(-1);
  }, 2000);
  return () => clearTimeout(timer);
  }

  const checkPassword=(value)=>{
   setConfirmPassword(value);
   console.log("Check Password is triggered");
   console.log(value);
   if(value != password)
   {
    errors.confirmPassword = "*** Password not matched ***";
   }
   else
   {
    errors.confirmPassword = "";
   }
   console.log(errors);
   setErrors(errors);
  }

 const newPasswordDetails=()=>{
  if(isPresent)
  {
   return (
    <div>
     <h2 className='text-center'>Change Password</h2>
     <div className = "form-group mb-2">
          <label className = "form-label">New Password </label>
          <input
                type = "password"
                placeholder = "new password"
                name = "password"
                className = "form-control"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
          >
          </input>
          <small className='text-danger'>{errors.password}</small>
     </div>
     <div className = "form-group mb-2">
          <label className = "form-label"> Confirm Password </label>
          <input
                type = "password"
                placeholder = "confirm new password"
                name = "confirmPassword"
                className = "form-control"
                value = {confirmPassword}
                onChange = {(e) => checkPassword(e.target.value)}
          >
          </input>
          <small className='text-danger'>{errors.confirmPassword}</small>
     </div>
     <button className='btn btn-primary' onClick={(e)=>changePassword(e)}>Set Password</button>
     <button className='btn btn-danger' onClick={(e)=>CancelPassword(e)}>Cancel</button>
    </div>
   )
  }
 }

 const CancelPassword=()=>{
    navigate('/log-in');
 }

  return (
    <div>
      <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       <h2 className='text-center'>Forgot Password</h2>
                       <h4 className='text-center'>Find your account</h4>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email Id </label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter your EmailId"
                                        name = "emailId"
                                        className = "form-control"
                                        value = {emailId}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className='text-center'>
                                 <button onClick={(e)=> checkUsername(e)}>Find</button>
                                </div>
                                {
                                 newPasswordDetails()
                                }
                            </form>

                        </div>
                    </div>
                </div>

           </div>
    </div>
  )
}

export default ForgotPassword
