import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const CountyList = () => {
    const { state, dispatch } = useContext(AppContext);
    const [metaData, setMetaData] = useState({
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
    });

    useEffect(() => {
        fetchCounties(metaData.currentPage);
    }, [metaData.currentPage]);

    const fetchCounties = async (page) => {
        try {
            const response = await axios.get(`https://localhost:7117/api/County/pagedlist?page=${page}`);
            dispatch({ type: "SAVE_COUNTY", payload: response.data.data || [] });

            if (response.data.metaData) {
                setMetaData((prev) => ({
                    ...prev,
                    ...response.data.metaData,
                }));
            }
        } catch (error) {
            console.error("Error fetching counties:", error);
        }
    };

    const handlePageClick = (event) => {
        setMetaData((prev) => ({ ...prev, currentPage: event.selected + 1 }));
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
                                <td colSpan="2">No counties available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={metaData.totalPages || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                forcePage={metaData.currentPage - 1}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default CountyList;
