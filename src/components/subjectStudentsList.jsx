import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SubjectStudentsList = () => {
    const { subjectId } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7117/api/Subject/${subjectId}/students`)
            .then(response => {
                setStudents(response.data.students || []);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, [subjectId]);

    return (
        <div className="SubjectStudentsList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Students for Subject</h1>
                <div className="col-md-6 mb-2">
                    <Link to="/subjects" className="btn btn-info">Back to Subjects</Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Parent Email</th>
                            <th>Parent Phone</th>
                            <th>Parent Name</th>
                            <th>Room Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={student.id || index}>
                                    <td>{student.code}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.parentEmail}</td>
                                    <td>{student.parentPhone}</td>
                                    <td>{student.parentName}</td>
                                    <td>{student.roomName}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No students available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubjectStudentsList;