import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";
import Pagination from "./pagination";
import 'bootstrap/dist/css/bootstrap.min.css';

const CountyList = () => {
    const { state, dispatch } = useContext(AppContext);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [metaData, setMetaData] = useState({
        pageSize: 10,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
    });

    useEffect(() => {
        fetchCounties(currentPage);
    }, [currentPage]);

    const fetchCounties = async (page) => {
        try {
            console.log(`Fetching counties for page: ${page}`);

            const response = await axios.get(`https://localhost:7117/api/County/pagedlist?pageNumber=${page}`);
            console.log("API Response:", response.data); // Debugging log

            const { data, metaData: newMetaData } = response.data;

            // Update state with new data
            dispatch({ type: "SAVE_COUNTY", payload: data || [] });

            // Update pagination metadata
            setMetaData((prev) => ({
                ...prev,
                ...newMetaData,
            }));
        } catch (error) {
            console.error("Error fetching counties:", error);
        }
    };

    const handlePageChange = ({ selected }) => {
        const newPage = selected + 1;
        console.log(`Changing to page: ${newPage}`); // Debugging log
        setCurrentPage(newPage);  // Update state, triggering useEffect
    };

    return (
        <div className="CountyList">
            <div className="container mt-4">
                <h1 className="text-center mb-4">County List</h1>
                <div className="col-md-6 mb-2">
                    <Link to="/add-county" className="btn btn-info">Add County</Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.counties.length > 0 ? (
                            state.counties.map((county, index) => (
                                <tr key={county.id || index}>
                                    <td>{county.code}</td>
                                    <td>{county.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">No counties available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <Pagination metaData={metaData} onPageChange={handlePageChange} />
        </div>
    );
};

export default CountyList;
