import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import Select from 'react-select';


const schema = z.object({
    code: z.string().min(3, 'Code is required'),
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    parentEmail: z.string().email('Email is required'),
    parentPhone: z.string().min(12, 'Invalid phone number'),
    parentName: z.string().min(3, 'Parent name is required'),
    roomId: z.string().uuid(),
    subjectIds: z.array(z.string().uuid())
});

const StudentForm = () => {
    const { roomId } = useParams();
    const [formData, setFormData] = useState({
        id: uuidv4(),
        code: '',
        firstName: '',
        lastName: '',
        parentEmail: '',
        parentPhone: '',
        parentName: '',
        roomId: roomId,
        subjectIds: []
    });
    const [errors, setErrors] = useState({});
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:7117/api/Subject/lookuplist')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSubjects(response.data);
                } else {
                    setSubjects([]);
                }
            })
            .catch(error => console.error('Error fetching subjects:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = schema.parse(formData);
            const response = await axios.post('https://localhost:7117/api/Student/Save', validatedData);
            console.log('Student saved:', response.data);
            navigate(`/rooms/${roomId}/students`);

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

    const handlePhoneChange = (parentPhone) => {
        setFormData({
            ...formData,
            parentPhone: parentPhone,
        });
    };

    const handleSubjectChange = (selectedOptions) => {
        const subjectIds = selectedOptions.map(option => option.value);
        setFormData({ ...formData, subjectIds });
    };
    return (
        <div className='StudentForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Student</h2>
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
                            placeholder='Enter student code'
                        />
                        {errors.code && <div className="text-danger">{errors.code[0]}</div>}
                    </div>
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
                        <label htmlFor='lastName'>Last Name</label>
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
                    <div className="col-md-6 mb-2">
                        <label htmlFor='parentEmail'>Parent email</label>
                        <input
                            type="email"
                            name="parentEmail"
                            className="form-control"
                            id="parentEmail"
                            value={formData.parentEmail}
                            onChange={handleChange}
                            placeholder='Enter last name'
                        />
                        {errors.parentEmail && <div className="text-danger">{errors.parentEmail[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='parentName'>Parent Name</label>
                        <input
                            type="text"
                            name="parentName"
                            className="form-control"
                            id="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            placeholder='Enter parent name'
                        />
                        {errors.parentName && <div className="text-danger">{errors.parentName[0]}</div>}
                    </div>

                    <div className="col-md-6 mb-2">
                        <PhoneInput
                            placeholder="Enter parent phone number"
                            value={formData.parentPhone}
                            onChange={handlePhoneChange} />
                        {errors.parentPhone && <div className="text-danger">{errors.parentPhone[0]}</div>}
                    </div>

                    <div className="col-md-6 mb-2">
                        <label htmlFor='subjectIds'>Subjects:</label>
                        <Select
                            isMulti
                            name="subjectIds"
                            options={subjects.map(subject => ({ value: subject.id, label: subject.name }))}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSubjectChange}
                        />
                        {errors.subjectIds && <div className="text-danger">{errors.subjectIds[0]}</div>}
                    </div>


                    <button className="btn btn-info" type="submit">Save</button>
                </form>

            </div>


        </div>

    );
};

export default StudentForm;