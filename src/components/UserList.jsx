import React from 'react';
import { format } from 'date-fns';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const UserList = () => {
    const { state } = useContext(AppContext);
    const { users } = state;
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
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dateOfBirth ? format(new Date(user.dateOfBirth), 'dd-MM-yyyy') : 'N/A'}</td>
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