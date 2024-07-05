import React, { Fragment, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Api/LoginApi';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        tempErrors.email = email ? "" : "Email is required.";
        tempErrors.password = password ? "" : "Password is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).every(key => tempErrors[key] === "");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {

            try {
                const response = await registerUser({ email, password });
                const responseBody = response.data.data.body;
                
                if (responseBody && responseBody.jwt) {
                    localStorage.setItem("token", responseBody.jwt);
                    localStorage.setItem("email", responseBody.userEmail);
                    console.log(responseBody.role)

                    if (responseBody.role === "ADMIN") {
                        navigate("/admintable");
                    } else if (responseBody.role === "USER") {
                        navigate("/usertable");
                    } else {
                        setMessage("Unexpected user role");
                        console.error("Unexpected user role", responseBody.role);
                    }
                } 
                // else {
                //     setMessage("User not found");
                //     console.error("Unexpected response structure", responseBody);
                // }
            } catch (error) {
                // setMessage("Error logging in");
                console.error("There was an error!", error);
            }
        } else {
            console.log("Form has errors");
        }
    };

    const handleBlur = (field) => (e) => {
        setTouched({
            ...touched,
            [field]: true,
        });
        validate();
    };

    const getValidationClass = (field) => {
        if (errors[field] && touched[field]) {
            return 'is-invalid';
        }
        if (!errors[field] && touched[field]) {
            return 'is-valid';
        }
        return '';
    };

    return (
        <Fragment>
            
            <div className='d-flex justify-content-center mt-5'>
            <form className='row mt-5 pt-3 ps- pe-4 pb-2 bg-light rounded-5 w-50' onSubmit={handleSubmit}>
                
                <div className='col-md-5 d-flex align-items-center justify-content-center'>
                    <img src="/login(2).jpg" alt="" width="200px" height="200px" />
                </div>
                
                <div className='col-md-7'>
                    <h1 className='login text-center'>Login</h1>

                    {message && <div className="alert alert-danger">{message}</div>}

                <div className="mb-3">
                    <label className='form-label fw-bold mt-2'>Email :</label>
                    <div className="input-group inputsize">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input
                            className={`form-control mt-1 ${getValidationClass('email')}`}
                            type='text'
                            placeholder='Enter Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleBlur('email')}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                </div>

                <div className="mb-3">
                    <label className='form-label fw-bold mt-2'>Password :</label>
                    <div className="input-group">
                        <span className="input-group-text"><FaLock /></span>
                        <input
                            className={`form-control mt-1 ${getValidationClass('password')}`}
                            type={showPassword ? "text" : 'password'}
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handleBlur('password')}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className='input-group-text'
                            style={{ cursor: 'pointer' }}>
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                        </span>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button className='btn mt-3 regbtn text-light fw-bold' type="submit">Log In</button>
                </div>

                <div className='d-flex mt-3'>
                    <p>Don't have an account?</p>
                    <Link to={'/signuppage'} className='mx-5'>Sign In</Link>
                </div>
            </div>
        </form>
        </div>
    </Fragment>




    );
}

export default Login;