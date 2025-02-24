import React, { useState } from 'react';
import { z } from 'zod';
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
    code: z.string().min(3, 'Code is required'),
    name: z.string().min(3, 'Name is required'),
    description: z.string().min(3, 'Description is required'),

});

const RoomForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        id: uuidv4(),
        code: '',
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = schema.parse(formData);
            const response = await axios.post('https://localhost:7117/api/Room/Save', validatedData);
            console.log('Room saved:', response.data);
            if (onSave) {
                onSave(response.data);
            }
            navigate("/rooms");

        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(error.flatten().fieldErrors);
                console.error("Validation Errors:", error.flatten().fieldErrors);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='RoomForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Room</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='code'>Code:</label>
                        <input
                            type="text"
                            name="code"
                            className="form-control"
                            id="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder='Enter room code'
                        />
                        {errors.code && <div className="text-danger">{errors.code[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='name'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter room name'
                        />
                        {errors.name && <div className="text-danger">{errors.name[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='description'>Description:</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Enter room description'
                        />
                        {errors.description && <div className="text-danger">{errors.description[0]}</div>}
                    </div>


                    <button className="btn btn-info" type="submit">Save</button>
                </form>

            </div>


        </div>

    );
};

export default RoomForm;