import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () =>{
    const [data , setData] = useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    }, []);

    const deleteContact = (No) => {
        if( window.confirm("Are you sure ?"))
        {
            axios.delete(`http://localhost:5000/api/remove/${No}`);
            toast.success("Entity deleted successfully");
            setTimeout(() => loadData(), 500);
        }
    }
    
    return (
        <div style={{marginTop:"150px"}}>
            <Link to="/addEntity">
                <button className="btn btn-contact">Add Entity</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>MobileNumber</th>
                        <th style={{textAlign: "center"}}>DateofBirth</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map((item, index) => {
                       return(
                         <tr key={item.No}>
                            <th scope = "row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobileNumber}</td>
                            <td>{item.dateOfBirth}</td>
                            <td>
                                <Link to={`/update/${item.No}`}>
                                    <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={()=> deleteContact(item.No)} >Delete</button>
                                <Link to={`/view/${item.No}`}>
                                    <button className='btn btn-view'>View</button>
                                </Link>
                            </td>
                         </tr>
                       )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home;