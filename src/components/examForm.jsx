import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from 'flowbite-react';

const schema = z.object({
    code: z.string().min(3, 'Code is required'),
    name: z.string().min(3, 'Name is required'),
    description: z.string().min(3, 'Description is required'),
    startDate: z.date(),
    endDate: z.date(),
    examType: z.number().int().min(0, 'Type is required'),
    examStatus: z.number().int().min(0, 'Type is required'),
    subjectId: z.string().uuid('Invalid subject ID'),
    departmentId: z.string().uuid()
});

const ExamForm = () => {
    const { departmentId } = useParams();
    const [formData, setFormData] = useState({
        id: uuidv4(),
        code: '',
        name: '',
        description: '',
        startDate: null,
        endDate: null,
        examType: '',
        examStatus: '',
        subjectId: '',
        departmentId: departmentId || ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [examTypes, setExamTypes] = useState([]);
    const [examStatuses, setExamStatuses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [departments, setDepartments] = useState([]);

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
        axios.get("https://localhost:7117/api/Department/lookuplist")
            .then(response => {
                if (Array.isArray(response.data)) {
                    setDepartments(response.data);
                } else {
                    setDepartments([]);
                }
            })
            .catch(error => console.error("Error fetching departments:", error));
    }, []);

    useEffect(() => {
        axios.get("https://localhost:7117/api/EnumLookup/ExamTypeList")
            .then(response => setExamTypes(response.data))
            .catch(error => console.error("Error fetching exam types:", error));
    }, []);

    useEffect(() => {
        axios.get("https://localhost:7117/api/EnumLookup/ExamStatusList")
            .then(response => setExamStatuses(response.data))
            .catch(error => console.error("Error fetching exam status:", error));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = schema.parse({
                ...formData,
                examType: Number(formData.examType),
                examStatus: Number(formData.examStatus)
            });
            const response = await axios.post('https://localhost:7117/api/Exam/Save', validatedData);
            console.log('Exam saved:', response.data);
            alert('Exam saved successfully');
            navigate('/exams');
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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleStartDateChange = (date) => {
        setFormData({ ...formData, startDate: date });
    };

    const handleEndDateChange = (date) => {
        setFormData({ ...formData, endDate: date });
    };


    return (
        <div className='ExamForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Exam</h2>
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
                                placeholder='Enter asset code'
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
                                placeholder='Enter  name'
                            />
                            {errors.name && <div className="text-danger">{errors.name[0]}</div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="startDate" className="form-label">Select a Date</label>
                            <div className="input-group">
                                <DatePicker
                                    key={formData.startDate}
                                    selected={formData.startDate}
                                    onChange={handleStartDateChange}
                                    className="form-control"
                                    id="startDate"
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Please select start date"
                                />
                            </div>
                            {errors.startDate && <div className="text-danger">{errors.startDate[0]}</div>}
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="endDate" className="form-label">Select a Date</label>
                            <div className="input-group">
                                <DatePicker
                                    key={formData.endDate}
                                    selected={formData.endDate}
                                    onChange={handleEndDateChange}
                                    className="form-control"
                                    id="endDate"
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Please select end date"
                                />
                            </div>
                            {errors.startDate && <div className="text-danger">{errors.startDate[0]}</div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="departmentId">Department:</label>
                            <select
                                name="departmentId"
                                id="departmentId"
                                className="form-control"
                                value={formData.departmentId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select a department --</option>
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && <div className="text-danger">{errors.departmentId[0]}</div>}
                        </div>
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
                    </div>
                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="examType">Type:</label>
                            <select
                                name="examType"
                                id="examType"
                                className="form-control"
                                value={formData.examType}
                                onChange={handleChange}
                            >
                                <option value="">-- Select an action --</option>
                                {examTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.examType && <div className="text-danger">{errors.examType[0]}</div>}
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="examStatus">Status:</label>
                            <select
                                name="examStatus"
                                id="examStatus"
                                className="form-control"
                                value={formData.examStatus}
                                onChange={handleChange}
                            >
                                <option value="">-- Select status --</option>
                                {examStatuses.map(status => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                            {errors.examStatus && <div className="text-danger">{errors.examStatus[0]}</div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12 mb-2">
                            <label htmlFor='description'> Description:</label>
                            <Textarea
                                type="text"
                                name="description"
                                className="form-control"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Enter description'
                            />
                            {errors.description && <div className="text-danger">{errors.description[0]}</div>}
                        </div>
                    </div>
                    <button className="btn btn-info" type="submit">Save Exam</button>
                </form>
            </div>
        </div>
    );
};
export default ExamForm;