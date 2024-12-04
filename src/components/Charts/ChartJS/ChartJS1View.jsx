import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const EchartView = (props) => {

    const [result, setResult] = useState([])
    const navigate = useNavigate();

    const location = useLocation()
    const alldata = location.state
    const response = location.state.admins
    //console.log("data", messages)
    const id = response._id
    console.log("id", id)

    console.log("response",)



    const passmessage = () => {
        navigate(`${process.env.PUBLIC_URL}/charts/groupmessage`, { state: alldata },
            //  console.log("messages", messages)
        )
    }


    const handel = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://34.202.105.255:4002/viewGroupReport", requestOptions)
            .then(response => response.json())
            .then(result => { setResult(result.chat); console.log(result) })
            .catch(error => console.log('error', error));

    }

    return (
        <div>
            <div className="table-responsive">
                <Table className="table table-bordered table-hover mb-0 text-md-nowrap">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>MobileNumber</th>
                            <th><button onClick={() => passmessage()}> see Messages</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((list) => (
                            <tr key={list}>
                                <th scope="row">{list.name}</th>

                                <td>{list.mobilenumber}</td>
                                <td></td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </div>

    )
}

export default EchartView;
