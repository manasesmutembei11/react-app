// src/components/UserList.jsx
import React from 'react';
import { format } from 'date-fns';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const UserList = () => {
    const { state } = useContext(AppContext);
    return (
        <div className="UserList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">User Data</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of birth</th>
                            <th>Gender</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{format(user.dateOfBirth.toISOString(), 'dd-MM-yyyy')}</td>
                                <td>{user.gender}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;