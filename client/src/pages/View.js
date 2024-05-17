import React, { useState, useEffect } from "react"; 
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {

const [user, setUser] = useState({});

const {No} = useParams();

useEffect(() => {

axios.get(`http://localhost:5000/api/get/${No}`)
.then((resp) => setUser({ ...resp.data[0] }));
}, [No]);

return (
<div style={{ marginTop: "150px" }}>

  <div className="card">

      <div className="card-header">

        <p>User Contact Detail</p>

      </div>

      <div className="container">

      | <strong>ID:</strong>
        <span>{No}</span>
        <br/><br/>
        <strong>Name:</strong>
        <span>{user.name}</span>
        <br/><br/>
        <strong>Email:</strong>
        <span>{user.email}</span>
        <br/><br/>
        <strong>Mobile:</strong>
        <span>{user.mobileNumber}</span>
        <br/><br/>
        <strong>DOB:</strong>
        <span>{user.dateOfBirth}</span>
        <br/><br/>
        <Link to="/">
          <div className="btn btn-edit">Go back</div>
        </Link>
      </div>

  </div>

</div>
)
}

export default View