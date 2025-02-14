// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';

const schema = z.object({
    code: z.string().min(3, 'Code is required'),
    name: z.string().min(3, 'Name is required'),
    description: z.string().min(3, 'Description is required'),
    id: z.string()

});

const DepartmentForm = ({ onSave }) => {
    const [formData, setFormData] = useState({ code: '', name: '', description: '', id: '' });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validatedData = schema.parse(formData);
        onSave(validatedData);
        axios.post('https://localhost:7117/api/Department/Save', validatedData)
            .then(response => {
                console.log('User saved:', response.data);
                setUsers([...formData, response.data]);
            })
            .catch(error => {
                if (error instanceof z.ZodError) {
                    setErrors(error.flatten().fieldErrors);
                }
            });
    };

    useEffect(() => {
        axios.get('https://localhost:7117/api/Department/pagedlist')
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='UserForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Create Department</h2>
                <form onSubmit={handleSubmit}>
                    <div class="col-md-6 mb-2">
                        <label htmlFor='code'>Code:</label>
                        <input
                            type="text"
                            name="code"
                            className="form-control"
                            id="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder='Enter department code'
                        />
                        {errors.code && <div className="text-danger">{errors.code[0]}</div>}
                    </div>
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
                        <label htmlFor='description'>Description:</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Enter department description'
                        />
                        {errors.description && <div className="text-danger">{errors.description[0]}</div>}
                    </div>


                    <button class="btn btn-info" type="submit">Save User</button>
                </form>

            </div>


        </div>

    );
};

export default DepartmentForm;