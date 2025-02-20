import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssetList = ({ departmentId }) => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7117/api/Asset/pagedlist?departmentId=${departmentId}`)
            .then(response => {
                setAssets(response.data.data || []);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
            });
    }, [departmentId]);

    return (
        <ul>
            {assets.map((asset, index) => (
                <li key={asset.id || index}>
                    {asset.name} - {asset.code} - {asset.quantity} - {asset.amount} - {asset.total} - {asset.description}
                </li>
            ))}
        </ul>
    );
};

export default AssetList;