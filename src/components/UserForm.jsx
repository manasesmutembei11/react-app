import React, { useState } from 'react';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useContext } from 'react';

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    dateOfBirth: z.date().nullable(),
    gender: z.string(),
    phone: z.string().max(15, 'Invalid phone number'),
});

const UserForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', dateOfBirth: null, gender: '', phone: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { dispatch } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted!", formData);  // Debug log

        try {
            const validatedData = userSchema.parse(formData);
            dispatch({ type: 'SAVE_USER', payload: validatedData });
            navigate("/users");
            setFormData({ name: '', email: '', dateOfBirth: null, gender: '', phone: '' });
            setErrors({});
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors(err.flatten().fieldErrors);
                console.error("Validation Errors:", err.flatten().fieldErrors);
            }
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (dateOfBirth) => {
        setFormData({
            ...formData,
            dateOfBirth,
        });
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value,
        });
    };

    return (
        <div className='UserForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Create User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='name'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                        {errors.name && <div className="text-danger">{errors.name[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='email'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                        {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor="dateOfBirth" className="form-label">Select a Date</label>
                        <div className="input-group">
                            <DatePicker
                                selected={formData.dateOfBirth}
                                onChange={handleDateChange}
                                className="form-control"
                                id="dateOfBirth"
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Please select date of birth"
                            />

                        </div>
                        {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label>Gender</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <PhoneInput
                            country={'ke'}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true,
                            }}
                        />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>

                    <button class="btn btn-info" type="submit">Save User</button>
                </form>

            </div>


        </div>

    );
};

export default UserForm;