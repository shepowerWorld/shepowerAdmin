import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
// import * as rangeslider from "./Rangesliderdata";
import { useNavigate } from "react-router-dom";
import './ChartJS.css'

const ChartJS = () => {

  const navigate = useNavigate();
  const [filteredResult, setFilteredResult] = useState([]);
  const [result, setResult] = useState([])
  console.log(result)
  useEffect(() => {
    handel();

  }, []
  )


  const handel = (query) => {



    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://34.202.105.255:4002/groupReports", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        setResult(result.reports);
        setFilteredResult(
          query
            ? result.reports.filter(report =>
              report.name.toLowerCase().includes(query.toLowerCase())
            )
            : result.reports
        );
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
                      <th>ReporterId</th>
                      <th>ReporterName</th>
                      <th>GroupName</th>
                      <th>AdminId/Name</th>

                    </tr>
                  </thead>
                  <tbody>
                    {result.map((list, index) => (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{list.user_id}</td>
                        <td>{list.user_name}</td>
                        <td>{list.groupName}</td>
                        <td><button onClick={() => navigate(`${process.env.PUBLIC_URL}/charts/groupview`, { state: list })}>View</button></td>
                        {/* <td>{list.admins[0].name}</td> */}
                        {console.log()}
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
export default ChartJS;
