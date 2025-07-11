import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";

const schema = z.object({
    code: z.string().min(3, 'Code is required'),
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    email: z.string().email('Email is required'),
    phoneNumber: z.string().min(12, 'Invalid phone number'),
    physicalAddress: z.string().min(3, 'Physical address is required'),
    type: z.number().int().min(0, 'Type is required'),
    subjectId: z.string().uuid('Invalid subject ID'),
    departmentId: z.string().uuid()
});

const TeacherForm = () => {
    const { departmentId } = useParams();
    const [formData, setFormData] = useState({
        id: uuidv4(),
        code: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        physicalAddress: '',
        type: '',
        subjectId: '',
        departmentId: departmentId || ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [teacherTypes, setTeacherTypes] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7117/api/Subject/lookuplist")
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSubjects(response.data);
                } else {
                    setSubjects([]);
                }
            })
            .catch(error => console.error("Error fetching subjects:", error));
    }, []);

    useEffect(() => {
        axios.get("https://localhost:7117/api/EnumLookup/TeacherTypeList")
            .then(response => setTeacherTypes(response.data))
            .catch(error => console.error("Error fetching teacher types:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = schema.parse({
                ...formData,
                type: Number(formData.type)
            });
            const response = await axios.post('https://localhost:7117/api/Teacher/Save', validatedData);
            console.log('Teacher saved:', response.data);
            alert('Teacher saved successfully');
            navigate(`/departments/${departmentId}/teacher-list`);
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

    const handlePhoneChange = (phoneNumber) => {
        setFormData({
            ...formData,
            phoneNumber: phoneNumber,
        });
    };

    return (
        <div className='TeacherForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Teacher</h2>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor='code'>Code:</label>
                            <input
                                type="text"
                                name="code"
                                className="form-control"
                                id="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder='Enter teacher code'
                            />
                            {errors.code && <div className="text-danger">{errors.code[0]}</div>}
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
                                placeholder='Enter email'
                            />
                            {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor='firstName'>First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='Enter first name'
                            />
                            {errors.firstName && <div className="text-danger">{errors.firstName[0]}</div>}
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor='lastName'> Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Enter last name'
                            />
                            {errors.lastName && <div className="text-danger">{errors.lastName[0]}</div>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor='phoneNumber'>Phone Number:</label>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange} />
                            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber[0]}</div>}
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor='physicalAddress'>Physical Address:</label>
                            <input
                                type="text"
                                name="physicalAddress"
                                className="form-control"
                                id="physicalAddress"
                                value={formData.physicalAddress}
                                onChange={handleChange}
                                placeholder='Enter physical address'
                            />
                            {errors.physicalAddress && <div className="text-danger">{errors.physicalAddress[0]}</div>}
                        </div>
                    </div>
                    <div className='row'>


                        <div className="col-md-6 mb-2">
                            <label htmlFor="subjectId">Subject:</label>
                            <select
                                name="subjectId"
                                id="subjectId"
                                className="form-control"
                                value={formData.subjectId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select a subject --</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            {errors.subjectId && <div className="text-danger">{errors.subjectId[0]}</div>}
                        </div>

                        <div className="col-md-6 mb-2">
                            <label htmlFor="type">Type:</label>
                            <select
                                name="type"
                                id="type"
                                className="form-control"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="">-- Select an action --</option>
                                {teacherTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.type && <div className="text-danger">{errors.type[0]}</div>}
                        </div>

                    </div>

                    <button className="btn btn-info" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};
export default TeacherForm;