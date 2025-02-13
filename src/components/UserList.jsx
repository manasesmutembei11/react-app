// src/components/UserList.jsx
import React from 'react';
import { format } from 'date-fns';

const UserList = ({ users }) => {
    return (
        <div className="UserList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">User Data</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of birth</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{format(user.dateOfBirth.toISOString(), 'dd-MM-yyyy')}</td>
                                <td>{user.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;