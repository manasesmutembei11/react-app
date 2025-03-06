import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
    code: z.string().min(3, 'Code is required'),
    name: z.string().min(3, 'Name is required'),
    description: z.string().min(3, 'Description is required'),
});

const SubjectForm = () => {
    const { subjectId } = useParams();
    const [formData, setFormData] = useState({
        id: uuidv4(),
        code: '',
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (subjectId) {
            axios.get(`https://localhost:7117/api/Subject/${subjectId}`)
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching subject:', error);
                });
        }
    }, [subjectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = schema.parse(formData);
            const response = await axios.post('https://localhost:7117/api/Subject/Save', validatedData);
            toast.success('Subject saved successfully');
            console.log('Subject saved:', response.data);
            navigate("/subjects");
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
        <div className='SubjectForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">{subjectId ? 'Edit Subject' : 'Create Subject'}</h2>
                <ToastContainer />
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
                            placeholder='Enter subject code'
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
                            placeholder='Enter subject name'
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
                            placeholder='Enter subject description'
                        />
                        {errors.description && <div className="text-danger">{errors.description[0]}</div>}
                    </div>
                    <button className="btn btn-info" type="submit">{subjectId ? 'Update Subject' : 'Save Subject'}</button>
                </form>
            </div>

        </div>
    );
};

export default SubjectForm;