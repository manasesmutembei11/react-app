import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentSubjectsModal = ({ student, show, handleClose }) => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (student && student.id) {
            axios.get(`https://localhost:7117/api/Student/${student.id}/subjects`)
                .then(response => {
                    setSubjects(response.data.subjects);
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
        }
    }, [student]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Subjects for {student?.firstName} {student?.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {subjects.length > 0 ? (
                    <ul>
                        {subjects.map(subject => (
                            <li key={subject.id}> {subject.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No subjects</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentSubjectsModal;