import React from 'react';
import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';


const SubjectList = () => {
    const { state, dispatch } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    useEffect(() => {
        fetchSubjects();
    }, [dispatch]);

    const fetchSubjects = () => {
        axios.get('https://localhost:7117/api/Subject/pagedlist')
            .then(response => {
                dispatch({ type: 'SAVE_SUBJECT', payload: response.data.data || [] });
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    };

    const handleDelete = (subjectId) => {
        setSubjectToDelete(subjectId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`https://localhost:7117/api/Subject/Delete/${subjectToDelete}`)
            .then(() => {
                dispatch({ type: 'DELETE_SUBJECT', payload: subjectToDelete });
                toast.success('Subject deleted successfully');
                fetchSubjects();
                setShowModal(false);
                setSubjectToDelete(null);


            })

            .catch(error => {
                console.error('Error deleting subject:', error);
                toast.error('Error deleting subject');
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSubjectToDelete(null);
    };


    return (
        <div className="SubjectList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Subject List</h1>
                <div className="col-md-6 mb-2">
                    <Link to="/add-subject" className="btn btn-info">Add Subject </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(state.subjects) && state.subjects.length > 0 ? (
                            state.subjects.map((subject, index) => (
                                <tr key={subject.id || index}>
                                    <td>{subject.code}</td>
                                    <td>{subject.name}</td>
                                    <td>{subject.description}</td>
                                    <td>
                                        <DropdownButton id="dropdown-basic-button" title="Actions" variant="secondary">
                                            <Dropdown.Item as={Link} to={`/subjects/${subject.id}/students`} >Students</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={`/edit-subject/${subject.id}`}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDelete(subject.id)}>Delete</Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No subjects available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ConfirmDeleteModal
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={confirmDelete}
            />

            <ToastContainer />
        </div>
    );
};

export default SubjectList;