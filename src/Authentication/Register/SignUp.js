import React, { Fragment, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Api/SignUpApi';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRoll, setUserRoll] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);

    const navigate = useNavigate();

    const handleUserRollChange = (e) => {
        setUserRoll(e.target.value);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.userName = userName ? "" : "UserName is required.";
        tempErrors.email = email ? "" : "Email is required.";
        tempErrors.phone = phone ? "" : "Phone Number is required.";
        tempErrors.password = password ? "" : "Password is required.";
        tempErrors.confirmPassword = confirmPassword ? "" : "Confirm Password is required.";

        if (password && confirmPassword && password !== confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).every(key => tempErrors[key] === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await registerUser({
                    userName,
                    email,
                    mobileNo: phone,
                    password,
                    confirmPassword,
                    userRoll
                });
                console.log(response)

                if (response.data.status) {
                    navigate('/loginpage');
                } else {
                    console.error("Registration failed", response.data);
                }
            } catch (error) {
                console.error("There was an error during registration!", error);
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
            <div className='container-fluid d-flex justify-content-center mb-2'>
                <form className='bg-light ps-5 pe-5 pt-3 pb-4 rounded-5 mt-2' onSubmit={handleSubmit}>
                    <h2 className='text-center mb-4'>Signup Here!</h2>

                    <div className="mb-3">
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

                    <div className="mb-3">
                        <label className='form-label fw-bold mt-2'>Password :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                className={`form-control mt-1 ${getValidationClass('password')}`}
                                type={showPassword ? "text" : 'password'}
                                placeholder='Enter Password'
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

                    <div className="mb-3">
                        <label className='form-label fw-bold mt-2'>Confirm Password :</label>
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
                        <label htmlFor="userRoll">UserRoll :</label>
                        <div className="form-group gender d-flex">
                            <div className='mx-2'>
                                <input
                                    id="admin"
                                    value="ADMIN"
                                    type="radio"
                                    className="form-radio"
                                    name="userRoll"
                                    checked={userRoll === 'ADMIN'}
                                    onChange={handleUserRollChange}
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div className='mx-2'>
                                <input
                                    id="user"
                                    value="USER"
                                    type="radio"
                                    className="form-radio"
                                    name="userRoll"
                                    checked={userRoll === 'USER'}
                                    onChange={handleUserRollChange}
                                />
                                <label htmlFor="user">User</label>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <button className='btn mt-4 text-center' type='submit'>Signup</button>
                    </div>

                    <div className='d-flex mt-3'>
                        <p>Already have an account?</p>
                        <Link to={'/loginpage'} className='mx-5 text-start'>Login</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );
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
