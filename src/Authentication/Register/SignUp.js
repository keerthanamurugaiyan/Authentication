import React, { Fragment, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Api/SignUpApi';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const navigate = useNavigate();

    const handleUserRoleChange = (e) => {
        setUserRole(e.target.value);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.userName = userName ? "" : "UserName is required.";
        tempErrors.email = email ? "" : "Email is required.";
        tempErrors.mobileNo = mobileNo ? "" : "Phone Number is required.";
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
            const response = await fetch('http://localhost:8080/api/auth/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    userName,
                    email,
                    mobileNo,
                    password,
                    confirmPassword,
                    userRole
                })
            });
            console.log(response)
            if (response.ok) {
                alert('User registered successfully!');
                setTimeout(() => navigate('/loginpage'), );
            } else {
                alert('Failed to register user.');
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
    <div className='container-fluid d-flex justify-content-center mt-5 mb-1 me-4'>
        <form className='row bg-light ps-2 pe-5 pt-3 pb-4 rounded-5 mt-2 w-50' onSubmit={handleSubmit}>
            <div className='col-md-5 mt-4 d-flex align-items-center justify-content-center'>
                <img src="/signup(2).jpg" alt="Signup" width="250px" height="370px" />
            </div>
            <div className='col-md-7'>
                <h2 className='text-center mb-4'>Signup Here!</h2>
                {responseMessage && <div className="alert alert-info">{responseMessage}</div>}

                <div className="mb-3">
                    {/* <label className='form-label fw-bold'>UserName :</label> */}
                    <div className="input-group">
                        <span className="input-group-text"><FaUser /></span>
                        <input
                            className={`input form-control ${getValidationClass('userName')}`}
                            type="text"
                            placeholder="UserName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={handleBlur('userName')}
                        />
                        
                        {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                    </div>
                </div>

                <div className="mb-3">
                    {/* <label className='form-label fw-bold mt-2'>Email :</label> */}
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
                    {/* <label className='form-label fw-bold mt-2'>Phone :</label> */}
                    <div className="input-group">
                        <span className="input-group-text"><FaPhone /></span>
                        <input
                            className={`form-control mt-1 ${getValidationClass('mobileNo')}`}
                            type='text'
                            placeholder='Enter Phone Number'
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            onBlur={handleBlur('mobileNo')}
                        />
                        {errors.mobileNo && <div className="invalid-feedback">{errors.mobileNo}</div>}
                    </div>
                </div>

                <div className="mb-3">
                    {/* <label className='form-label fw-bold mt-2'>Password :</label> */}
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

                <div className="mb-">
                    {/* <label className='form-label fw-bold mt-2'>Confirm Password :</label> */}
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
                            {passwordConfirm ? <IoEyeOff /> : <IoEye />}
                        </span>
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                </div>

                <div className='mt-3 d-flex fw-bold'>
                    <label htmlFor="userRole">User Role :</label>
                    <div className="form-group gender d-flex">
                        <div className='mx-2'>
                            <input
                                id="admin"
                                value="ADMIN"
                                type="radio"
                                className="form-radio"
                                name="userRole"
                                checked={userRole === 'ADMIN'}
                                onChange={handleUserRoleChange}
                            />
                            <label htmlFor="admin">Admin</label>
                        </div>
                        <div className='mx-2'>
                            <input
                                id="user"
                                value="USER"
                                type="radio"
                                className="form-radio"
                                name="userRole"
                                checked={userRole === 'USER'}
                                onChange={handleUserRoleChange}
                            />
                            <label htmlFor="user">User</label>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button className='btn mt-2 text-center regbtn' type='submit'>Signup</button>
                </div>

                <div className='d-flex mt-3 mx-'>
                    <p>Already have an account?</p>
                    <Link to={'/loginpage'} className='mx-5 text-start'>Login</Link>
                </div>
            </div>
        </form>
    </div>
</Fragment>

    

    );
}

export default SignUp;
