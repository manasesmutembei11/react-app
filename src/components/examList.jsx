import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ExamList = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7117/api/Exam/pagedlist`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => {
                setExams(response.data.data || []);
            })
            .catch(error => {
                console.error('Error fetching exams:', error);
            });
    });
    return (
        <div className="ExamList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Exam List</h1>
                <div className="col-md-6 mb-2">
                    <Link to="/add-exam" className="btn btn-info">Add Exam </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                            <th>Department</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Type</th>

                        </tr>
                    </thead>
                    <tbody>

                        {exams.map((exam, index) => (
                            <tr key={exam.id || index}>
                                <td>{exam.code}</td>
                                <td>{exam.name}</td>
                                <td>{exam.description}</td>
                                <td>{exam.startDate ? format(new Date(exam.startDate), 'dd-MM-yyyy') : 'N/A'}</td>
                                <td>{exam.endDate ? format(new Date(exam.endDate), 'dd-MM-yyyy') : 'N/A'}</td>
                                <td>{exam.departmentName}</td>
                                <td>{exam.subjectName}</td>
                                <td>{exam.examStatusName}</td>
                                <td>{exam.examTypeName}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamList;