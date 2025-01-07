import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";

import { Col, Row, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import * as Dashboarddata from "./data";
// import { COLUMNS, DATATABLE, GlobalFilter } from "./data";
import dashboardApi from "../../../api/dashboardApi";
import "./Dashboard.css";
export default function Dashboard() {
  const [AllUsersCount, SetAllUsersCount] = useState();
  const [newUsersCount, setnewUsersCount] = useState();
  const [TotalCitizensCount, setTotalCitizensCount] = useState();
  const [LeaderCount, setLeaderCount] = useState();
  const [Groupcount, setGroupcount] = useState();
  useEffect(() => {
    getAllCount();
  }, []);

  const getAllCount = async () => {
    const new_user = await dashboardApi.newusersCount();
    if (new_user) {
      setnewUsersCount(new_user?.count);
    }
    const total_citizen = await dashboardApi.totalCitizensCount();

    if (total_citizen?.status === true) {
      setTotalCitizensCount(total_citizen?.totalCitizensCount);
    }

    const total_leader = await dashboardApi.totalLeaderCount();
    if (total_leader?.status === true) {
      setLeaderCount(total_leader?.totalLeaderCount);
    }

    const group_count = await dashboardApi.groupCount();

    if (group_count) {
      setGroupcount(group_count);
    }
    const total_user_count = await dashboardApi.totalUsersCount();
    if (total_user_count.status === true) {
      SetAllUsersCount(total_user_count?.totalUsersCount);
    }
  };

  if (Groupcount !== undefined) {
    return (
      <div
        className="bootcard"
        style={{ marginTop: "50px", marginLeft: "100px", display: "block" }}>
        <Row className="row-sm">
          <Col lg={3} xl={3} md={4} sm={6} className="col-12">
            <Card className="bg-danger-gradient text-white">
              <Card.Body className="card-body">
                <Row>
                  <div className="col-6">
                    <div className="icon1 mt-2 text-center">
                      <i className="fe fe-user tx-40"></i>
                    </div>
                  </div>
                  <Col className="col-6">
                    <div className="mt-0 text-center">
                      <span className="text-white">Total Users</span>
                      <h2 className="text-white mb-0">{AllUsersCount}</h2>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} xl={3} md={4} sm={6} className="col-12">
            <Card className="bg-danger-gradient text-white">
              <Card.Body className="card-body">
                <Row>
                  <div className="col-6">
                    <div className="icon1 mt-2 text-center">
                      <i className="fe fe-user tx-40"></i>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-0 text-center">
                      <span className="text-white">Citizens</span>
                      <h2 className="text-white mb-0">{TotalCitizensCount}</h2>
                    </div>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} xl={3} md={4} sm={6} className="col-12">
            <Card className="bg-danger-gradient text-white">
              <Card.Body className="card-body">
                <Row>
                  <div className="col-6">
                    <div className="icon1 mt-2 text-center">
                      <i className="fe fe-users tx-40"></i>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-0 text-center">
                      <span className="text-white">Group Count</span>
                      <h2 className="text-white mb-0">
                        {Groupcount.status === false ? "0" : Groupcount.count}
                      </h2>
                    </div>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} xl={3} md={4} sm={6} className="col-12">
            <Card className="bg-danger-gradient text-white">
              <Card.Body className="card-body">
                <Row>
                  <div className="col-6">
                    <div className="icon1 mt-2 text-center">
                      <i className="fe fe-user tx-40"></i>
                    </div>
                  </div>
                  <Col className="col-6">
                    <div className="mt-0 text-center">
                      <span className="text-white">New Users</span>
                      <h2 className="text-white mb-0">{newUsersCount}</h2>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} xl={3} md={4} sm={6} className="col-12">
            <Card className="bg-danger-gradient text-white">
              <Card.Body className="card-body">
                <Row>
                  <div className="col-6">
                    <div className="icon1 mt-2 text-center">
                      <i className="fe fe-user tx-40"></i>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-0 text-center">
                      <span className="text-white">Leaders</span>
                      <h2 className="text-white mb-0">{LeaderCount}</h2>
                    </div>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
