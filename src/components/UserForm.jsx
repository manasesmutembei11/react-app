// src/components/UserForm.jsx
import React, { useState } from 'react';
import { date, z } from 'zod';
import DatePicker from 'react-datepicker';

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    dateOfBirth: z.date().refine((dateOfBirth) => {
        return dateOfBirth.toLocaleString();
    },
        {
            message: "Date must be in the past",
        }

    ),
    gender: z.string(),
    phone: z.phone()
});

const UserForm = ({ onSave }) => {
    const [formData, setFormData] = useState({ name: '', email: '', dateOfBirth: null });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const validatedData = userSchema.parse(formData);
            onSave(validatedData);
            console.log("data", validatedData)
            setFormData({ name: '', email: '', dateOfBirth: null });
            setErrors({});
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
                    <div class="col-md-6 mb-2">
                        <label htmlFor="dateOfBirth">Select a Date</label>
                        <DatePicker
                            name='dateOfBirth'
                            selected={formData.dateOfBirth}
                            onChange={handleDateChange}
                            className="form-control"
                            id="dateOfBirth"
                            dateFormat="dd-MM-yyyy"
                            placeholder="Please select date of birth"
                        />
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

                    <button class="btn btn-info" type="submit">Save User</button>
                </form>

            </div>


        </div>

    );
};

export default UserForm;