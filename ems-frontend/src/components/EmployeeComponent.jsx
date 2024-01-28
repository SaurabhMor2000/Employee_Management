import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import '../service/LOE.css' // Import CSS for styling

const EmployeeComponent = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstname);
                    setLastName(response.data.lastname);
                    setEmail(response.data.email);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstname, lastname, email };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                createEmployee(employee)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'First name is required';
            valid = false;
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>;
        } else {
            return <h2 className='text-center'>Add Employee</h2>;
        }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstname}
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstname && <div className='invalid-feedback'> {errors.firstname} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastname}
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastname && <div className='invalid-feedback'> {errors.lastname} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
