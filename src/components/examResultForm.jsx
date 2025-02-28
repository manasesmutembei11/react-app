import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';


const schema = z.object({
    examId: z.string().uuid('Invalid exam ID'),
    studentId: z.string().uuid('Invalid student ID'),
    subjectId: z.string().uuid('Invalid subject ID'),
    score: z.number().int().min(0, 'Score is required'),
    grade: z.string().min(0, 'Grade is required'),
    remark: z.string().min(0, 'Remark is required')
});

const ExamResultForm = () => {
    const { examResultId } = useParams();
    const [formData, setFormData] = useState({
        examId: '',
        examName: '',
        studentId: '',
        studentName: '',
        subjectId: '',
        subjectName: '',
        score: 0,
        grade: '',
        remark: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);


    useEffect(() => {
        if (examResultId) {
            axios.get(`https://localhost:7117/api/ExamResult/${examResultId}`)
                .then(response => setFormData(response.data))
                .catch(error => console.error('Error fetching exam result:', error));
        }
    }, [examResultId]);

    useEffect(() => {
        axios.get('https://localhost:7117/api/Exam/pagedlist')
            .then(response => setExams(response.data.data || []))
            .catch(error => console.error('Error fetching exams:', error));
    }, []);

    useEffect(() => {
        axios.get("https://localhost:7117/api/Student/lookuplist")
            .then(response => {
                if (Array.isArray(response.data)) {
                    setStudents(response.data);
                } else {
                    setStudents([]);
                }
            })
            .catch(error => console.error("Error fetching subjects:", error));
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleScoreChange = (e) => {
        const score = parseInt(e.target.value, 10);
        const grade = getGrade(score);
        setFormData({ ...formData, score, grade });
    };

    const getGrade = (score) => {
        if (score >= 91 && score <= 100) return 'A';
        if (score >= 81 && score <= 90) return 'B';
        if (score >= 71 && score <= 80) return 'C';
        if (score >= 61 && score <= 70) return 'D';
        if (score >= 51 && score <= 60) return 'E';
        return 'F';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = schema.parse(formData);
            const response = await axios.post('https://localhost:7117/api/ExamResult/Save', validatedData);
            console.log('Exam result saved:', response.data);
            alert('Exam result saved successfully');
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

    return (
        <div className="ExamResultForm">
            <div className="container mt-5">
                <h2 className="text-center mb-4">{examResultId ? 'Edit Exam Result' : 'Add Exam Result'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="examId">Exam:</label>
                            <select
                                name="examId"
                                id="examId"
                                className="form-control"
                                value={formData.examId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select an exam --</option>
                                {exams.map(exam => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.name}
                                    </option>
                                ))}
                            </select>
                            {errors.examId && <div className="text-danger">{errors.examId[0]}</div>}
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="studentId">Student:</label>
                            <select
                                name="studentId"
                                id="studentId"
                                className="form-control"
                                value={formData.studentId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select a student --</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                            {errors.studentId && <div className="text-danger">{errors.studentId[0]}</div>}
                        </div>
                    </div>
                    <div className="row">
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
                            <label htmlFor="score">Score:</label>
                            <input
                                type="number"
                                name="score"
                                className="form-control"
                                id="score"
                                value={formData.score}
                                onChange={handleScoreChange}
                                placeholder="Enter score"
                            />
                            {errors.score && <div className="text-danger">{errors.score[0]}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="grade">Grade:</label>
                            <input
                                type="text"
                                name="grade"
                                className="form-control"
                                id="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                placeholder="Grade"
                                readOnly
                            />
                            {errors.grade && <div className="text-danger">{errors.grade[0]}</div>}
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <label htmlFor="remark">Remark:</label>
                            <textarea
                                name="remark"
                                className="form-control"
                                id="remark"
                                value={formData.remark}
                                onChange={handleChange}
                                placeholder="Enter remark"
                            />
                            {errors.remark && <div className="text-danger">{errors.remark[0]}</div>}
                        </div>
                    </div>
                    <button className="btn btn-info" type="submit">{examResultId ? 'Update' : 'Save'} Exam Result</button>
                </form>
            </div>
        </div>
    );
};

export default ExamResultForm;