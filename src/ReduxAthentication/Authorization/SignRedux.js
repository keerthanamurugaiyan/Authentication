import React from 'react' 
import React, { Fragment, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
 import { IoEye, IoEyeOff } from 'react-icons/io5';
 import { Link } from 'react-router-dom';
 import { useFormik } from 'formik'; import * as Yup from 'yup';                                   

const SignRedux = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);

    const validationSchema = Yup.object({
        userName: Yup.string().required('UserName is required.'),
        email: Yup.string().email('Invalid email format.').required('Email is required.'),
        phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number format.').required('Phone Number is required.'),
        password: Yup.string().required('Password is required.'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match.').required('Confirm Password is required.') 
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted successfully', values);
        }
    });

  return (
      
        <Fragment>
            <div className='container-fluid d-flex justify-content-center mb-2'>
                <form className='bg-light ps-5 pe-5 pt-3 pb- rounded-5 mt-3' onSubmit={formik.handleSubmit}>
                    <h2 className='text-center mb-4'>Signup Here!</h2>

                    <div className="mb-">
                        <label className='form-label fw-bold'>UserName :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input
                                className={`input form-control ${formik.touched.userName && formik.errors.userName ? 'is-invalid' : ''} ${formik.touched.userName && !formik.errors.userName ? 'is-valid' : ''}`}
                                type="text"
                                placeholder="Enter UserName"
                                {...formik.getFieldProps('userName')}
                            />
                            {formik.touched.userName && formik.errors.userName && (
                                <div className="invalid-feedback">{formik.errors.userName}</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-">
                        <label className='form-label fw-bold mt-2'>Email :</label>
                        <div className="input-group inputsize">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input
                                className={`form-control mt-1 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} ${formik.touched.email && !formik.errors.email ? 'is-valid' : ''}`}
                                type='text'
                                placeholder='Enter Email Address'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>
                    </div> 

                    <div className="mb-">
                        <label className='form-label fw-bold mt-2'>Phone :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaPhone /></span>
                            <input
                                className={`form-control mt-1 ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''} ${formik.touched.phone && !formik.errors.phone ? 'is-valid' : ''}`}
                                type='text'
                                placeholder='Enter Phone Number'
                                {...formik.getFieldProps('phone')}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className="invalid-feedback">{formik.errors.phone}</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-">
                        <label className='form-label fw-bold mt-2'>Password :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                className={`form-control mt-1 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} ${formik.touched.password && !formik.errors.password ? 'is-valid' : ''}`}
                                type={showPassword ? "text" : 'password'}
                                placeholder='Enter password'
                                {...formik.getFieldProps('password')}
                            />
                            <span 
                                onClick={() => setShowPassword(!showPassword)} 
                                className='input-group-text' 
                                style={{ cursor: 'pointer' }}>
                                {showPassword ? <IoEye /> : <IoEyeOff />}
                            </span>
                            {formik.touched.password && formik.errors.password && (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-">
                        <label className='form-label fw-bold mt-2'>Confirm password :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaCheck /></span>
                            <input
                                className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''} ${formik.touched.confirmPassword && !formik.errors.confirmPassword ? 'is-valid' : ''}`}
                                type={passwordConfirm ? 'text' : 'password'}
                                placeholder='Enter Confirm Password'
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            <span 
                                onClick={() => setPasswordConfirm(!passwordConfirm)} 
                                className='input-group-text' 
                                style={{ cursor: 'pointer' }}>
                                {passwordConfirm ? <IoEyeOff /> : <IoEye />}
                            </span>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                            )}
                        </div>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <button className='btn mt-4 text-center' type='submit'>Signup</button>
                    </div>

                    <div className='d-flex mt-2'>
                        <p>already you have an account?</p>
                        <Link to={'/loginpage'} className='mx-5 text-start'>Login</Link>
                    </div>
                </form>
            </div>
        
        </Fragment>
  )
}

export default SignRedux












