import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const SubjectList = () => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        axios.get('https://localhost:7117/api/Subject/pagedlist')
            .then(response => {
                dispatch({ type: 'SAVE_SUBJECT', payload: response.data.data || [] });
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [dispatch]);


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

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(state.subjects) && state.subjects.length > 0 ? (
                            state.subjects.map((subject, index) => (
                                <tr key={subject.id || index}>
                                    <td>{subject.code}</td>
                                    <td>{subject.name}</td>
                                    <td>{subject.description}</td>
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
        </div>
    );
};

export default SubjectList;