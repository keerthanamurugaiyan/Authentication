import React, { Fragment, useState } from 'react';
import { FaUser, FaLock} from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        let tempErrors = {};
        tempErrors.userName = userName ? "" : "UserName is required.";
        tempErrors.password = password ? "" : "Password is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).every(key => tempErrors[key] === "");
    }

        const handleSubmit = (e) => {
            e.preventDefault();
            if (validate()) {
                // Submit form
                console.log("Form submitted successfully");
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
                <form className='mt-5 p-5 bg-light rounded-5' onSubmit={handleSubmit}>
                    <h1 className='text-center'>Login</h1>

                    <div className="mb-3">
                        <label className='form-label fw-bold'>UserName :</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input
                                className={`form-control ${getValidationClass('userName')}`}
                                type="text"
                                placeholder="Enter Your UserName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                onBlur={handleBlur('userName')}
                            />
                            {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
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
                        <button className='btn mt-4'>Login In</button>
                    </div>

                </form>
            </div>
        </Fragment>
    )
}

export default Login
