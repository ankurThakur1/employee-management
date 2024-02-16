import React, { useState, useEffect } from 'react';
import { BiPlus, BiSearch, BiEdit, BiTrash, BiStreetView } from "react-icons/bi";
import "./emplist.css";
import { Link, useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Details from './Details';

const EmpList = () => {
    const [empLists, setEmpLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [id, setId] = useState("");

    const fetchEmpDetails = async () => {
        try {
            const res = await fetch(`https://json-server-api-steel.vercel.app/employee`);
            const data  = await res.json();
            console.log(data);
            setEmpLists(data);
            setLoading(false);
        } catch (error) {
            setError(true)
            console.log(error);
        }
    }

    
    useEffect(() => {
        fetchEmpDetails();
    }, []);
    
    if(error) return  <h1>{"Error occured while fetching employees"}</h1>

    const handleDelete = async (id) => {
        const res = await fetch(`https://json-server-api-steel.vercel.app/employee/${id}`, {
            method: "DELETE"
        })
        .then((res) => {
            alert("Entry has been deleted!!");
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    }

   

    const sortByAtoZ = () => {
        const sortArr = [...empLists];
        if(sortArr.length > 0){
            const arr = sortArr.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            setEmpLists(arr);
        }
    }

    const sortByZtoA = () => {
        const sortArr = [...empLists];
        if(sortArr.length > 0){
            const arr = sortArr.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
            setEmpLists(arr);
        }
    }


  return (
    <div className="main">
        {
            modal && <Details setModal={setModal} id={id} />
        }
        <div className="heading">
            <h1>Employee Management App</h1>
        </div>
        <div className="emplist">
            <div className="form">
                <div className="search">
                    <input type="text" placeholder="Search data by name, email" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <BiSearch />
                </div>
                <Link to="/create"><button className="create-btn"><BiPlus /> Create Employee</button></Link>
            </div>
            <div className="sort-section">
                <span>Sort By: </span>
                <button className="sort-btn" onClick={sortByAtoZ}>A-z</button>
                <button className="sort-btn" onClick={sortByZtoA}>Z-a</button>
                <button className="sort-btn" onClick={fetchEmpDetails}>Previous</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ? 
                    <ScaleLoader color="orange" /> :
                    empLists && empLists.filter((emp) => (
                        emp.name && emp.name.toLowerCase().includes(search.toLowerCase()) ||
                        emp.email && emp.email.toLowerCase().includes(search)
                    )).map((emplist, index) => (
                        <tr key={emplist.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{emplist.name}</td>
                            <td>{emplist.email}</td>
                            <td>{emplist.phone}</td>
                            <td>{emplist.gender}</td>
                            <td className="actions">
                                <Link to={`/update/${emplist.id}`}>
                                    <button className="edit"><BiEdit /> Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(emplist.id)} className="delete"><BiTrash /> Remove</button>
                                <button className="view" onClick={() => [setId(emplist.id), setModal(true)]}><BiStreetView /> View</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EmpList;