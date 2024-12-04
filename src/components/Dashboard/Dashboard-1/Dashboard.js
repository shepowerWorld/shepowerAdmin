import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import {
  Breadcrumb,
  Col,
  Row,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Dashboarddata from "./data";
import { COLUMNS, DATATABLE, GlobalFilter } from "./data";
import "./Dashboard.css";
import { APiURl } from "../../Services/ApiAddress";
export default function Dashboard() {
  const [AllUsersCount, SetAllUsersCount] = useState();
  const [newUsersCount, setnewUsersCount] = useState();
  const [TotalCitizensCount, setTotalCitizensCount] = useState();
  const [LeaderCount, setLeaderCount] = useState();
  const [Groupcount, setGroupcount] = useState();
  console.log("Groupcount",Groupcount)
  const [totalUsersCount, settotalUsersCount] = useState();
  const token = sessionStorage.getItem('token')
  useEffect(() => {
    getAllCount();
  }, []);

  const getAllCount = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APiURl + "totalUsersCount", requestOptions)
      .then((response) => response.json())
      .then((result) => SetAllUsersCount(result.totalUsersCount))
      .catch((error) => console.log("error", error));


    var requestOptions1 = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APiURl + "newusers", requestOptions1)
      .then((response) => response.json())
      .then((result) => setnewUsersCount(result.count))
      .catch((error) => console.log("error", error));

    var requestOptions2 = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(APiURl + "totalCitizensCount", requestOptions2)
      .then((response) => response.json())
      .then((result) => setTotalCitizensCount(result.totalCitizensCount))
      .catch((error) => console.log("error", error));

    var requestOptions3 = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(APiURl + "totalLeaderCount", requestOptions3)
      .then((response) => response.json())
      .then((result) => setLeaderCount(result.totalLeaderCount))
      .catch((error) => console.log("error", error));



    var requestOption4 = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APiURl+"groupCount", requestOption4)
      .then(response => response.json())
      .then(result =>{ setGroupcount(result)
      console.log("dashboard/dashboard-1/",result)
      })
      .catch(error => console.log('error', error));

    var requestOption5 = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APiURl+"totalUsersCount", requestOption5)
      .then(response => response.json())
      .then(result => settotalUsersCount(result.totalUsersCount))
      .catch(error => console.log('error', error));


  };
if(Groupcount !==undefined)
{
  return (
    <div
      className="bootcard"
      style={{ marginTop: "50px", marginLeft: "100px", display: "block" }}
    >
      <Row className="row-sm">
        <Col lg={6} xl={3} md={6} className="col-12">
          <Card className="  text-white">
            <Card.Body style={{backgroundColor:'rgba(243,63,129,255)' ,borderRadius:5}}>
              <Row>
                <div className="col-6">
                  <div className="icon1 mt-2 text-center">
                    <i className="fe fe-user tx-40"></i>
                  </div>
                </div>
                <Col className="col-6">
                  <div className="mt-0 text-center">
                    <span className="text-white"> Total Users </span>
                    <h2 className="text-white mb-0">{AllUsersCount}</h2>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} xl={3} md={6} className="col-12">
          <Card className=" bg-danger-gradient text-white" >
            <Card.Body  style={{
                backgroundColor: 'rgba(243,63,129,255)',
                borderRadius: 5,
               
               
                '@media (min-width: 1200px)': {
                  height: '100px', 
                },
                }}>
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
        <Col lg={6} xl={3} md={6} className="col-12">
          <Card className="  text-white">
            <Card.Body style={{backgroundColor:'rgba(243,63,129,255)' ,borderRadius:5}}>
              <Row>
                <div className="col-6">
                  <div className="icon1 mt-2 text-center">
                    <i className="fe fe-users tx-40"></i>
                  </div>
                </div>
                <div className="col-6" >
                  <div className="mt-0 text-center">
                    <span className="text-white">Group Count</span>
                    <h2 className="text-white mb-0">{Groupcount.status == false ? "0":Groupcount.count}</h2>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col lg={6} xl={3} md={6} className="col-12">
          <Card className=" bg-warning-gradient text-white">
            <Card.Body>
              <Row>
                <div className="col-6">
                  <div className="icon1 mt-2 text-center">
                    <i className="fe fe-pie-chart tx-40"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-0 text-center">
                    <span className="text-white">Taxes</span>
                    <h2 className="text-white mb-0">876</h2>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      <Row className="row-sm">
        <Col lg={6} xl={3} md={6} className="col-12">
          <Card className=" text-white ">
            <Card.Body style={{backgroundColor:'rgba(243,63,129,255)' ,borderRadius:5}}>
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
        <Col lg={6} xl={3} md={6} className="col-12">
          <Card className="  text-white">
            <Card.Body style={{backgroundColor:'rgba(243,63,129,255)' ,borderRadius:5}}>
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
        {/* <Col lg={6} xl={3} md={6} className="col-12">
          <Card className=" bg-success-gradient text-white">
            <Card.Body>
              <Row>
                <div className="col-6">
                  <div className="icon1 mt-2 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="3em"
                      viewBox="0 0 512 512"
                    >
                      <path
                        style={{ fill: "white" }}
                        d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-0 text-center">
                    <span className="text-white">Group Count</span>
                    <h2 className="text-white mb-0">{Groupcount}</h2>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col lg={6} xl={3} md={6} className="col-12">
          <Card className=" bg-warning-gradient text-white">
            <Card.Body>
              <Row>
                <div className="col-6">
                  <div className="icon1 mt-2 text-center">
                    <i className="fe fe-pie-chart tx-40"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-0 text-center">
                    <span className="text-white">Group Count</span>
                    <h2 className="text-white mb-0">{Groupcount}</h2>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col> */}


      </Row>
    </div>
  )
      }
}
