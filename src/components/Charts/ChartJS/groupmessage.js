import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function GroupMessage() {

    const [result, setResult] = useState([])
    const navigate = useNavigate();

    const location = useLocation()
    const response = location.state
    console.log("alldata", response)
    const id = response.user._id
    console.log("id", id)
    const messages = response.chat



    const block = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`http://34.202.105.255:4002/blockGroup/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert(result.message)
            })
            .catch(error => console.log('error', error));
    }
    const navigo = (e) => {
        e.preventDefault();
        navigate("/charts/charetgroupjs/");
    };


    return (
        <div>
            <div className="table-responsive">
                <Table className="table table-bordered table-hover mb-0 text-md-nowrap">
                    <thead>
                        <tr>
                            <th>Messages</th>
                            {/* <th>MobileNumber</th> */}
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((list) => (
                            <tr key={list}>
                                <th scope="row">{list.message}</th>
                                <td><img style={{ width: 50, height: 50, alignSelf: "center", marginTop: 15 }} src={"https://hiddenlybucket2.s3.amazonaws.com/images/" + list.image} alt={list.image} /></td>


                                {/* <td>{list.mobilenumber}</td> */}

                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <button onClick={block} >Block</button>
                    <button onClick={navigo}>Cancel</button>
                </div>
            </div>

        </div>

    )
}

export default GroupMessage;
