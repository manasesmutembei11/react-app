import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const TeacherList = () => {
    const { departmentId } = useParams();
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://localhost:7117/api/Teacher/pagedlist/${departmentId}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => {
                setTeachers(response.data.data || []);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, [departmentId]);

    const handleShowModal = (teacher) => {
        setSelectedTeacher(teacher);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTeacher(null);
    };

    return (
        <div className="TeacherList">
            <div className="container mt-4">
                <h1 className="text-center mb-4"> List</h1>
                <div className="col-md-6 mb-2">
                    <Link to={`/departments/${departmentId}/add-teacher`} className="btn btn-info">Add Teacher </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Type</th>
                            <th>Subject</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>

                        {teachers.map((teacher, index) => (
                            <tr key={teacher.id || index}>
                                <td>{teacher.code}</td>
                                <td>{teacher.firstName}</td>
                                <td>{teacher.lastName}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phoneNumber}</td>
                                <td>{teacher.typeName}</td>
                                <td>{teacher.subjectName}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleShowModal(teacher)}>View</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            {selectedTeacher && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Teacher Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Code:</strong> {selectedTeacher.code}</p>
                        <p><strong>First Name:</strong> {selectedTeacher.firstName}</p>
                        <p><strong>Last Name:</strong> {selectedTeacher.lastName}</p>
                        <p><strong>Email:</strong> {selectedTeacher.email}</p>
                        <p><strong>Phone Number:</strong> {selectedTeacher.phoneNumber}</p>
                        <p><strong>Type:</strong> {selectedTeacher.typeName}</p>
                        <p><strong>Subject:</strong> {selectedTeacher.subjectName}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
export default TeacherList;