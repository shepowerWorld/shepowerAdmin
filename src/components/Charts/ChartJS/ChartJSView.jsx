import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function ChartJSView() {
  const navigat = useNavigate();

  const [blocker, setblocker] = useState();



  console.log(blocker);
  const location = useLocation();

  const response = location.state;
  console.log(response);
  const result = response.chat;

  const bolckerid = response._id;
  console.log(bolckerid);
  // const response = state.location

  const block = (e) => {
    e.preventDefault();
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(`http://34.202.105.255:4002/blockUser/${bolckerid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        alert(result.message);

        console.log('other block', result);
      })
      .catch((error) => console.log("error", error));
  };





  const navifaorrr = (e) => {
    e.preventDefault();
    navigat("/charts/charetjs/");
  };

  return (
    <div>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            Report Management
          </span>
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

            <img
              src="https://www.edyoda.com/static/media/icon-search-black.659381fa.svg"
              id="search-icon"
            />
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
                      {/* <th>Messages</th> */}
                      <th>Sender Name</th>

                      <th>Sender No </th>
                      <th>Message</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((list, index) => (
                      <tr key={index}>
                        <th scope="row">{list.senderName}</th>
                        <td>{list.sender_id}</td>
                        <td>{list.message}</td>
                        <td><img style={{ width: 50, height: 50, alignSelf: "center", marginTop: 15 }} src={"https://hiddenlybucket2.s3.amazonaws.com/images/" + list.image} alt={list.image} /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <button onClick={block}>block</button>
                <button onClick={navifaorrr}>cancel</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ChartJSView;
