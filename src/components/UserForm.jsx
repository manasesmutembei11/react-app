// src/components/UserForm.jsx
import React, { useState } from 'react';
import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
});

const UserForm = ({ onSave }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const validatedData = userSchema.parse(formData);
            onSave(validatedData);
            setFormData({ name: '', email: '' });
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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p>{errors.name[0]}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p>{errors.email[0]}</p>}
            </div>
            <button type="submit">Save User</button>
        </form>
    );
};

export default UserForm;