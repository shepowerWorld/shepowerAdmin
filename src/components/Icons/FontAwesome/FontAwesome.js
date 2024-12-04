import React from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
// import * as rangeslider from "./Rangesliderdata";
const FontAwesome = () => {

  const data = [
    {
      id: "1",
      Name: "Joan Powell",
      Position: "Associate Developer",
      Salary: "$450,870",
    },
    {
      id: "2",
      Name: "Gavin Gibson",
      Position: "Account manager",
      Salary: "$230,540",
    },
    {
      id: "3",
      Name: "Julian Kerr",
      Position: "Senior Javascript Developer",
      Salary: "$55,300",
    },
    {
      id: "4",
      Name: "Cedric Kelly",
      Position: "Accountant",
      Salary: "$234,100",
    },
    {
      id: "5",
      Name: "Samantha May",
      Position: "Junior Technical Author",
      Salary: "$43,198",
    },
  ];

  return (
    <div>

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">User Management</span>
        </div>
        <div className="justify-content-center mt-2">
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
                      <th>UserName</th>
                      <th>UserId</th>
                      <th>UserPhoneNo</th>
                      <th>No.ofViewers</th>


                    </tr>
                  </thead>
                  <tbody>
                    {data.map((list, index) => (
                      <tr key={index}>
                        <th scope="row">{list.id}</th>
                        <td>{list.UserName}</td>
                        <td>{list.UserId}</td>
                        <td>{list.UserPhoneNo}</td>
                        <td>{list.No.ofViewers}</td>

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
export default FontAwesome;
