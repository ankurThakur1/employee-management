import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./create.css";


const Create = () => {
    const [createEmp, setCreateEmp] = useState({});
    const [error, setError] = useState(false);
    console.log(createEmp);
    const navigate = useNavigate();

    const handleFormData = (e) => {
        setCreateEmp({
            ...createEmp,
            [e.target.name]: e.target.value
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!createEmp.name || !createEmp.email || !createEmp.phone){
            alert("Please fill all fields");
        } 
        else{
            await fetch(`http://localhost:8000/employee`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createEmp)
            })
            .then((res) => {
                navigate("/");
            })
            .catch((error) => {
                setError(true);
            })
        }

    }


    if(error) return <h1>{"Error occured while creating employee"}</h1>

  return (
    <div className="create">
        <form onSubmit={handleSubmit}>
            <h1>Create Employee</h1>
            <div className="form-control">
                <label>Name</label>
                <input type="text" name="name" placeholder="Enter name"  value={createEmp.name} onChange={handleFormData} />
            </div>
            <div className="form-control">
                <label>Email</label>
                <input type="email"  name="email" placeholder="Enter email" value={createEmp.email} onChange={handleFormData} />
            </div>
            <div className="form-control">
                <label>Phone</label>
                <input type="number" name="phone" placeholder="Enter phone number" value={createEmp.number} onChange={handleFormData} />
            </div>
            <div className="form-control">
                <label>Gender</label>
                <select name='gender' onChange={handleFormData}>
                    <option>--select your gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <button type="submit" className="form-btn">Submit</button>
            <Link to="/"><button className="back">Back</button></Link>
        </form>
    </div>
  )
}

export default Create;