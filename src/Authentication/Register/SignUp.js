import React, { Fragment, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import {Link, useNavigate} from 'react-router-dom';
// import { createUser } from './Api';
import { registerUser } from '../Api/SignUpApi';

function SignUp() {
    const [userName, setUserName] = useState('');
    // const [emailOrPhone, setEmailOrPhone] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRoll, setUserRoll] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);

    const navigate = useNavigate()

    const handleUserRollChange = (e) => {
        setUserRoll(e.target.value);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.userName = userName ? "" : "UserName is required.";
        tempErrors.email = email ? "" : "Email is required.";
        tempErrors.phone = phone ? "" : "Phone Number is required";
        tempErrors.password = password ? "" : "Password is required.";
        tempErrors.confirmPassword = confirmPassword ? "" : "Confirm Password is required.";
        
        // tempErrors.useRoll = userRoll ?  "" : "userRoll is required."
        
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const phoneRegex = /^\d{10}$/;
        
        // if (emailOrPhone && !emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
        //     tempErrors.emailOrPhone = "Invalid email or phone format.";
        // }

        // if (email && !emailRegex.test(email)) {
        //     tempErrors.email = "Invalid email format.";
        // }

        // if (phone && phoneRegex.test(phone)) {
        //     tempErrors.phone = "Invalid phone number format.";
        // }
        
        if (password && confirmPassword && password !== confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).every(key => tempErrors[key] === "");
    };
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // setLoder(true)
    //     const validationErrors = validateForm();
    //     if (Object.keys(validationErrors).length > 0) {
    //       setErrors(validationErrors);
    //       return;
    //     }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            // Submit form
            registerUser(
                { userName, email, mobileNo:phone, password, confirmPassword, userRoll }
            )
            console.log("Form submitted successfully");
        } else {
            console.log("Form has errors");
        }

    // try { 
    //     const response = await createUser({ userName, email, phone, password, confirmPassword });
    // } catch (error) {
    //     console.log(error);
    // }
    navigate('/loginpage');    
}

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
          
            <div className='container-fluid d-flex justify-content-center mb-2'>
                <form className='bg-light ps-5 pe-5 pt-3 pb- rounded-5 mt-2' onSubmit={handleSubmit}>
                    
                    <h2 className='text-center mb-4'>Signup Here!</h2>

                    <div className="mb-">
                        <label className='form-label fw-bold'>UserName :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input
                                className={`input form-control ${getValidationClass('userName')}`}
                                type="text"
                                placeholder="Enter UserName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                onBlur={handleBlur('userName')}
                            />
                            {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                        </div>
                    </div>

                    {/* <div className="mb-3">
                        <label className='form-label fw-bold mt-2'>Email or Phone :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input
                                className={form-control mt-1 ${getValidationClass('emailOrPhone')}}
                                type='text'
                                placeholder='Enter Email or Phone'
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                onBlur={handleBlur('emailOrPhone')}
                            />
                            {errors.emailOrPhone && <div className="invalid-feedback">{errors.emailOrPhone}</div>}
                        </div>
                    </div> */}

                    <div className="mb-">
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

                    <div className="mb-">
                        <label className='form-label fw-bold mt-2'>Phone :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaPhone /></span>
                            <input
                                className={`form-control mt-1 ${getValidationClass('phone')}`}
                                type='text'
                                placeholder='Enter Phone Number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={handleBlur('phone')}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                    </div>

                    <div className="mb-">
                        <label className='form-label fw-bold mt-2'>Password :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                className={`form-control mt-1 ${getValidationClass('password')}`}
                                type={showPassword ? "text" : 'password'}
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handleBlur('password')}
                            />
                            <span 
                                onClick={() => setShowPassword(!showPassword)} 
                                className='input-group-text' 
                                style={{ cursor: 'pointer' }}>
                                {showPassword ? <IoEye /> : <IoEyeOff />}
                            </span>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    </div>

                    <div className="mb-">
                        <label className='form-label fw-bold mt-2'>Confirm password :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaCheck /></span>
                            <input
                                className={`form-control ${getValidationClass('confirmPassword')}`}
                                type={passwordConfirm ? 'text' : 'password'}
                                placeholder='Enter Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={handleBlur('confirmPassword')}
                            />
                            <span 
                                onClick={() => setPasswordConfirm(!passwordConfirm)} 
                                className='input-group-text' 
                                style={{ cursor: 'pointer' }}>
                                {passwordConfirm ? <IoEye /> : <IoEyeOff />}
                            </span>
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                    </div>

                    <div className='mt-3 d-flex fw-bold'>
                                <label htmlFor="userroll">UserRoll :</label>
                                <div className="form-group gender d-flex">
                                    <div className='mx-2'>
                                        <input
                                            id="admin"
                                            value="admin"
                                            type="radio"
                                            className="formredio"
                                            name="userroll"
                                            checked={userRoll === 'admin'}
                                            onChange={handleUserRollChange}  
                                            />
                                        <label htmlFor="admin mx-5">Admin</label>
                                    </div>

                                    <div className="form-group gender">
                                    <div className=''>
                                        <input
                                            id="user"
                                            value="user"
                                            type="radio"
                                            className="formredio"
                                            name="userroll"
                                            checked={userRoll === 'user'}
                                            onChange={handleUserRollChange}  
                                            />
                                        <label htmlFor="user">User</label>
                                    </div>
                                
                                </div>
                                </div>    
                    </div>   

                    <div className='d-flex justify-content-end'>
                        <button onClick={handleSubmit}  className='btn mt-4 text-center' type='submit'>Signup</button>
                    </div>

                    <div className='d-flex mt-3'>
                        <p>already you have an accound?</p>
                        <Link to={'loginpage'} className='mx-5 text-start'>Login</Link>
                    </div>
                
                </form>    
            </div>
            
        </Fragment>
    )
}

export default SignUp;


















        
















// import React, { Fragment } from 'react'

// function SignUp() {
//     return (

//         <Fragment>

//             <div className='container-fluid d-flex justify-content-center'>

//                 <form className='bg-light ps-5 pe-5 pt-4 pb-4 rounded-5 mt-5'>

//                     <h2 className='text-center mb-4'>Signup Here!</h2>

//                         <label className='form-label fw-bold'>UserName :</label>
//                         <input
//                             className="form-control col-"
//                             type="text"
//                             placeholder="Enter UserName"
//                             // autoComplete="off"
//                             // value={name}
//                         />

//                         <label className='form-lable fw-bold mt-2'>Email or Phone :</label>
//                         <input 
//                             className='form-control mt-1'
//                             type='text'
//                             placeholder='Enter Email or Phone'
//                             // autoComplete=''
//                         />

//                         <label className='form-lable fw-bold mt-2'>Password :</label>
//                         <input 
//                             className='form-control mt-1'
//                             type='password'
//                             placeholder='Enter password'
//                         />

//                         <label className='form-label fw-bold mt-2'>Confirm password :</label>
//                         <input 
//                             className='form-control mt-'
//                             type='password'
//                             placeholder='Enter Confirm Password'
//                         />

//                         <div className='d-flex justify-content-end'>
//                             <button className='btn mt-4 text-center '>Signup</button>
//                         </div>
                    

//                 </form>

//             </div>

//         </Fragment>


        
//     )
// }

// export default SignUp
