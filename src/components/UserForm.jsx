// src/components/UserForm.jsx
import React, { useState } from 'react';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom';

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    dateOfBirth: z.date(),
    gender: z.string(),
    phone: z.string().max(15, 'Invalid phone number'),
});

const UserForm = ({ onSave }) => {
    const [formData, setFormData] = useState({ name: '', email: '', dateOfBirth: null, gender: '', phone: 0 });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const validatedData = userSchema.parse(formData);
            onSave(validatedData);
            console.log("data", validatedData)
            setFormData({ name: '', email: '', dateOfBirth: null });
            setErrors({});
            navigate("/users")
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors(err.flatten().fieldErrors);
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
                    <div class="col-md-6 mb-2">
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
                    <div class="col-md-6 mb-2">
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

                    <div class="col-md-6 mb-2">
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6 mb-2">
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