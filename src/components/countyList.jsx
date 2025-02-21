import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import AssetList from './assetList';
import AssetForm from './assetForm';
import { Link } from 'react-router-dom';
import { FaList } from 'react-icons/fa';


const CountyList = () => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        axios.get('https://localhost:7117/api/County/pagedlist')
            .then(response => {
                dispatch({ type: 'SAVE_COUNTY', payload: response.data.data || [] });
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching counties:', error);
            });
    }, [dispatch]);


    return (
        <div className="CountyList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">County List</h1>
                <div className="col-md-6 mb-2">
                    <Link to="/add-county" className="btn btn-info">Add County </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(state.departments) && state.counties.length > 0 ? (
                            state.counties.map((county, index) => (
                                <tr key={county.id || index}>
                                    <td>{county.code}</td>
                                    <td>{county.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No counties available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CountyList;