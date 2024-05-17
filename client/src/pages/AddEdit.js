import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

const initialState = {
  name: "",
  email: "",
  mobileNumber: "",
  dateOfBirth: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, mobileNumber, dateOfBirth } = state;

  const navigate = useNavigate();

  const {No} = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/get/${No}`)
    .then((resp)=> setState({...resp.data[0]}));
  }, [No]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !mobileNumber || !dateOfBirth) {
      toast.error("Please provide values for all fields.");
    } else {
      if(!No)
        {
          axios
          .post("http://localhost:5000/api/post", {
            name,
            email,
            mobileNumber,
            dateOfBirth,
          })
          .then(() => {
            setState(initialState);
          })
          .catch((err) => toast.error(err.response.data));
          toast.success("entity added successfully");
        setTimeout(() => navigate("/"), 500);
        }
        else
        {
          axios
        .put(`http://localhost:5000/api/update/${No}`, {
          name,
          email,
          mobileNumber,
          dateOfBirth,
        })
        .then(() => {
          setState(initialState);
        })
        .catch((err) => toast.error(err.response.data));
        toast.success("entity updated successfully");
      setTimeout(() => navigate("/"), 500);
        }
      
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          type="text"
          id="mobileNumber"
          name="mobileNumber"
          placeholder="Your number"
          value={mobileNumber || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          placeholder="Your DOB"
          value={dateOfBirth || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={No ? "Updte" : "Save"}/>

        <Link to="/">
          <input type="button" value="Go back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
