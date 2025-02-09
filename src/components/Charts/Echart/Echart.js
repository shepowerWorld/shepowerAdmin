import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
import './Echart.css'
import { useNavigate } from "react-router-dom";

const Echart = () => {
  const [result, setResult] = useState([])
  const navigate = useNavigate();

  console.log(result)
  useEffect(() => {
    handel();

  }, []
  )


  const handel = () => {

    //   var raw = "";

    //   var requestOptions = {
    //     method: 'GET',
    //     // body: raw,
    //     redirect: 'follow'
    //   };

    //   fetch("http://34.202.105.255:4002/onetooneReports", requestOptions)
    //     .then(response => response.json())
    //     .then(result => {
    //       setResult(result.allReport);
    //       console.log(result)
    //     })
    //     .catch(error => console.log('error', error));

    // }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://192.168.1.16:4002/groupReports", requestOptions)
      .then(response => response.json())
      .then(result => {
        setResult(result.allReport);
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Report Management</span>
        </div>
        {/* <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
              Tables
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item "
              active
              aria-current="page"
            >
              Basic tables
            </Breadcrumb.Item>
          </Breadcrumb>
        </div> */}


        <div id="right-menu">
          <div id="search-container">
            <input type="text" id="search-box"></input>

            <img src="https://www.edyoda.com/static/media/icon-search-black.659381fa.svg" id="search-icon" />
          </div>
        </div>

      </div>

      <Row className="row-sm">

        <Col xl={12}>
          <Card>
            <Card.Header className=" pb-0">
              <div className="d-flex justify-content-between">
                {/* <h4 className="card-title mg-b-0">Delivery Guy Details</h4> */}
              </div>
              {/* <p className="tx-12 tx-gray-500 mb-2">
            Example of Nowa Hoverable Rows Table.. <Link to="#">Learn more</Link>
          </p> */}
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered table-hover mb-0 text-md-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      {/* <th>ReportedId</th>
                      <th>ReportedUserName</th> */}
                      <th>ReporterId</th>
                      <th>ReporterName</th>
                      <th>GroupName</th>
                      <th>AdminId/Name</th>
                      <th>AdminName</th>
                      {/* <th>Status</th> */}

                    </tr>
                  </thead>
                  <tbody>
                    {result.map((list, index) => (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{list.user_id}</td>
                        <td>{list.user_name}</td>
                        <td>{list.GroupName}</td>
                        <td><button onClick={() => navigate(`${process.env.PUBLIC_URL}/charts/echartview`, { state: list })}>View</button></td>
                        <td>{list.AdminName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </div>
  )
}
export default Echart;
