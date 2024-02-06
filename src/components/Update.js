import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import "./create.css";


const Update = () => {
    const [editEmp, setEditEmp] = useState({});
    const [error, setError] = useState(false);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
      fetch(`http://localhost:8000/employee/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEditEmp(data);
        console.log(data);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
    }, []);


    const handleInput = (e) => {
      setEditEmp({
        ...editEmp,
        [e.target.name]: e.target.value
      });
    }

    const handleEdit = (e) => {
      e.preventDefault();

      fetch(`http://localhost:8000/employee/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(editEmp)
      })
      .then((res) => {
        setTimeout(() => {
          navigate("/");
        }, 800);
      })
      .catch(err => {
        console.log(err);
      }) 
    }




    if(error) return <h1>{"Error occured while edit employee"}</h1>

  return (
    <div className="create">
        <form onSubmit={handleEdit}>
            <h1>Edit Employee</h1>
            <div className="form-control">
                <label>Name</label>
                <input type="text" name="name" placeholder="Enter name" value={editEmp.name} onChange={handleInput} />
            </div>
            <div className="form-control">
                <label>Email</label>
                <input type="email"  name="email" placeholder="Enter email" value={editEmp.email} onChange={handleInput} />
            </div>
            <div className="form-control">
                <label>Phone</label>
                <input type="number" name="phone" placeholder="Enter phone number" value={editEmp.phone} onChange={handleInput} />
            </div>
            <div className="form-control">
                <label>Gender</label>
                <select name='gender' onChange={handleInput} value={editEmp.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <button type="submit" className="form-btn">Update</button>
            <Link to="/"><button className="back">Back</button></Link>
        </form>
    </div>
  )
}

export default Update;