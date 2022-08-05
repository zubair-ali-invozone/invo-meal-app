import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {allUsersAction, deleteUserAction, deleteUserResetAction} from "../redux/action";
import {deleteDialogue, successAlert} from "./alerts";

const AllUsers = () => {
    const dispatch = useDispatch();
    const {allUsersLoading, allUsersData, allUsersError} = useSelector(state => state.allUsers);
    const {deleteUserLoading, deleteUserData, deleteUserError} = useSelector(state => state.deleteUser);

    const [rowIndex, setRowIndex] = useState(-1);
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        dispatch(allUsersAction());
    }, []);

    useEffect(() => {
        if (deleteUserData?.status === true) {
            successAlert(deleteUserData?.msg);
            dispatch(deleteUserResetAction());
            dispatch(allUsersAction());
            setRowIndex(-1);
        }
    }, [deleteUserData]);

    const deleteUser = async (userId, index) => {
        const result = await deleteDialogue();
        if (result) {
            setRowIndex(index);
            dispatch(deleteUserAction({id: userId}));
        }
    }

    const searchHandle = () => {
        dispatch(allUsersAction({
            query: searchVal
        }));
    }

    const resetHandle = () => {
        setSearchVal('')
        dispatch(allUsersAction());
    }

    return (
        <>
            <h1 className="h3 mb-3">Users</h1>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">All Users</h5>
                        </div>
                        <div className="card-body">
                            <form autoComplete="off">
                                <div className="form-group row mb-3">
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control form-control-lg"
                                               value={searchVal}
                                               placeholder="Search..." autoComplete="off"
                                               onChange={(e) => setSearchVal(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="btn-group btn-group-lg mb-3" role="group"
                                             aria-label="Large button group">
                                            <button type="button" className="btn btn-success" onClick={searchHandle}>Go</button>
                                            <button type="button" className="btn btn-danger" onClick={resetHandle}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th width="1" scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">CNIC</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Email</th>
                                    <th width="1" scope="col">Status</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {allUsersLoading ? (<tr><td colSpan={8} className="text-center"><strong>Loading...</strong></td></tr>) : allUsersData?.data?.map((data, index) => (
                                    <tr key={index} className={rowIndex === index && "text-decoration-line-through text-danger"}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.cnic}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.designation}</td>
                                        <td>{data.email}</td>
                                        <td>{data.status === 1 ? <span class="badge bg-success">Active</span> : <span class="badge bg-danger">Inactive</span>}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/edit-user/${data.id}`} className="btn btn-success me-2">Edit</Link>
                                            <button className="btn btn-danger" onClick={() => deleteUser(data.id, index)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {allUsersData?.data?.length === 0 && (<tr><td colSpan={8} className="text-center"><strong>Sorry! No record found</strong></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AllUsers;