import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DisciplineList = () => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        axios.get('https://localhost:7117/api/Discipline/pagedlist')
            .then(response => {
                dispatch({ type: 'SAVE_DISCIPLINE', payload: response.data.data || [] });
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, [dispatch]);


    return (
        <div className="DisciplineList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Discipline List</h1>
                <div className="col-md-6 mb-2">
                    <Link to="/add-discipline" className="btn btn-info">Add Discipline </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(state.disciplines) && state.disciplines.length > 0 ? (
                            state.disciplines.map((discipline, index) => (
                                <tr key={discipline.id || index}>
                                    <td>{discipline.code}</td>
                                    <td>{discipline.name}</td>
                                    <td>{discipline.description}</td>
                                    <td>{discipline.disciplineAction}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No disciplines available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DisciplineList;