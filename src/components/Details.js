import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./details.css";

const Details = ({ setModal, id }) => {
    const [showModal, setShowModal] = useState({});
    // const { id } = useParams();

    useEffect(() => {
      fetch(`https://json-server-api-steel.vercel.app/employee/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setShowModal(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
    }, []);
    


  return (
    <div className="details">
        <div className="modal">
          <h2 className="name">Name: {showModal.name}</h2>
          <h3 className="email">Email: {showModal.email}</h3>
          <span className="phone">Phone: {showModal.phone}</span>
          <span className="gender">Gender: {showModal.gender}</span>
          <button className="btn-close" onClick={() => setModal(false)}>Close</button>
        </div>  
    </div>
  )
}

export default Details;