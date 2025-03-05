import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import StudentSubjectsModal from './studentSubjectsModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
    const { roomId } = useParams();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://localhost:7117/api/Student/pagedlist/${roomId}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => {
                setStudents(response.data.data || []);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, [roomId]);

    const handleShowModal = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedStudent(null);
    };

    return (
        <div className="StudentList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Student List</h1>
                <div className="col-md-6 mb-2">
                    <Link to={`/rooms/${roomId}/add-student`} className="btn btn-info">Add Student</Link>
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
                            <th>Subjects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id || index}>
                                <td>{student.code}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.parentEmail}</td>
                                <td>{student.parentPhone}</td>
                                <td>{student.parentName}</td>
                                <td>
                                    <Button variant="link" onClick={() => handleShowModal(student)}>
                                        View Subjects
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <StudentSubjectsModal
                student={selectedStudent}
                show={showModal}
                handleClose={handleCloseModal}
            />
        </div>
    );
};

export default StudentList;