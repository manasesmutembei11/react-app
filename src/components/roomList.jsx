import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import AssetList from './assetList';
import AssetForm from './assetForm';
import { Link } from 'react-router-dom';
import { FaList } from 'react-icons/fa';


const RoomList = () => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        axios.get('https://localhost:7117/api/Room/pagedlist')
            .then(response => {
                dispatch({ type: 'SAVE_ROOM', payload: response.data.data || [] });
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching rooms:', error);
            });
    }, [dispatch]);


    return (
        <div className="RoomList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">List</h1>
                <div className="col-md-6 mb-2">
                    <Link to="/add-room" className="btn btn-info">Add Room </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Students</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(state.rooms) && state.rooms.length > 0 ? (
                            state.rooms.map((room, index) => (
                                <tr key={room.id || index}>
                                    <td>{room.code}</td>
                                    <td>{room.name}</td>
                                    <td>{room.description}</td>
                                    <td>
                                        <Link to={`/rooms/${room.id}/students`}><FaList /> Students</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No rooms available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomList;