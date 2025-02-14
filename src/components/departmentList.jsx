
import React from 'react';

const DepartmentList = () => {
    const { state } = useContext(AppContext);

    useEffect(() => {
        axios.get('https://localhost:7117/api/Department/list')
            .then(response => {
                dispatch({ type: 'SET_DEPARTMENTS', payload: response.data });
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, [dispatch]);
    return (
        <div className="DepartmentList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Description Data</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Description</th>

                        </tr>
                    </thead>
                    <tbody>
                        {state.departments.map((department, index) => (
                            <tr key={index}>
                                <td>{department.code}</td>
                                <td>{department.name}</td>
                                <td>{department.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentList;