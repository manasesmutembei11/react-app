import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TeacherList = () => {
    const { departmentId } = useParams();
    const [teachers, setTeachers] = useState([]);

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
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TeacherList;