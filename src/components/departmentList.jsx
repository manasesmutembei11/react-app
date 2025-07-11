import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import ChatbotButton from '../buttons/ChatbotButton';
import 'bootstrap/dist/css/bootstrap.min.css';


const DepartmentList = () => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        axios.get('https://localhost:7117/api/Department/pagedlist')
            .then(response => {
                dispatch({ type: 'SAVE_DEPARTMENT', payload: response.data.data || [] });
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, [dispatch]);


    return (
        <div className="DepartmentList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Department Data</h1>
                <div className="d-flex justify-content-end mb-3">
                    <ChatbotButton />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Assets</th>
                            <th>Teachers</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(state.departments) && state.departments.length > 0 ? (
                            state.departments.map((department, index) => (
                                <tr key={department.id || index}>
                                    <td>{department.code}</td>
                                    <td>{department.name}</td>
                                    <td>{department.description}</td>
                                    <td>
                                        <Link to={`/departments/${department.id}/asset-list`}><FaList /> Assets</Link>
                                    </td>
                                    <td>
                                        <Link to={`/departments/${department.id}/teacher-list`}><FaList /> Teachers</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No departments available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentList;