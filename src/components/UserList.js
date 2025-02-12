// src/components/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the server (this will be your API endpoint)
        axios.get("/api/users").then((response) => {
            setUsers(response.data);
        });
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.firstName} {user.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
