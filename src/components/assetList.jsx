import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AssetList = () => {
    const { departmentId } = useParams();
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7117/api/Asset/pagedlist/${departmentId}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => {
                setAssets(response.data.data || []);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
            });
    }, [departmentId]);
    return (
        <div className="AssetList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">Asset List</h1>
                <div className="col-md-6 mb-2">
                    <Link to={`/departments/${departmentId}/add-asset`} className="btn btn-info">Add Asset </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Total</th>

                        </tr>
                    </thead>
                    <tbody>

                        {assets.map((asset, index) => (
                            <tr key={asset.id || index}>
                                <td>{asset.code}</td>
                                <td>{asset.name}</td>
                                <td>{asset.quantity}</td>
                                <td>{asset.amount}</td>
                                <td>{asset.total}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;