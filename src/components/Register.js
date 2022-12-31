import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userService from '../service.js/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timer from '../service.js/Timer';

toast.configure();
const Register = () => {

    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailId, setEmailId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');


    const [errors, setErrors] = useState({});
    const [check, setCheck] = useState('');
    
    const navigate = useNavigate();

    const Login = () => {
        navigate("/log-in");
    }

    const Submit = (e) => {
        e.preventDefault();
        var user = { username, phoneNumber, emailId, password };
        var dum = {};
        var count = 0;
        for (let i in user) {
            if (user[i].length === 0) {
                errors[i] = "*** This field is required ***";
                count++;
            }
        }

        errors.confirmPassword = "";
        console.log(errors);
        if (password !== confirmPassword) {
            errors.confirmPassword = "*** Password not matched ***";
            setCheck("*** Password not matched ***")
            setErrors(...errors, errors);
        }

        else {
            if (count !== 0) {
                setErrors(...errors, errors);
            }
            else {
                RegisterNewUser(user);
            }
        }
    }

    const RegisterNewUser = (user) => {
        userService.addUser(user).then((response) => {
            console.log(response.data);
                toast.success("User Registered Successfully");
                toast.loading("Redirecting to Login Page", { position: 'top-center' });
                Timer.timer({ "time": 2000 })
                Login();
        }).catch(error =>{
            console.log(error);
            toast.error(error.response.data.message);
        })
    }


    const checkPassword = (value) => {
        setConfirmPassword(value);
        if (value !== password) {
            setCheck("*** Password not matched ***");
        }
        else {
            setCheck("");
        }
    }


    return (
        <div>
            <div className='p-5'></div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">New User Registration</h2>
                        <div className="card-body">
                            <form>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Username </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        name="username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.username} </small>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Phone Number </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your Phone Number"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.phoneNumber}</small>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> EmailId </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your Email Id"
                                        name="emailId"
                                        className="form-control"
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.emailId}</small>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Password :</label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{errors.password}</small>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Confirm Password :</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => checkPassword(e.target.value)}
                                    >
                                    </input>
                                    <small className='text-danger'>{check}</small>
                                </div>

                                <button className="btn btn-success" onClick={(e) => Submit(e)} > Register  </button>
                                <div className='side-by-side'>
                                    <h4 >Already has an account?</h4>
                                    <div className='p-1'></div>
                                    <button className="btn btn-link" onClick={() => Login()} > Back to Login Page </button>
                                </div>
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

export default Register
