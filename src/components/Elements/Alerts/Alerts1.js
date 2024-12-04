import React from "react";
import { useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Card,
  Breadcrumb,
  Form,
} from "react-bootstrap";
//import { API_URL } from "../../../service";
import { useNavigate } from "react-router-dom";
import { APiURl } from "../../Services/ApiAddress";
import Swal from "sweetalert2";
import "./Alerts1.css";

function Alerts1() {
  const [categoryname, setCategoryname] = useState("");
  const token = sessionStorage.getItem('token');
  function Title(message) {
    Swal.fire({
      title: "Well done!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: message,
    });
  }

  function Warningalert() {
    Swal.fire({
      title: "Category Already Exists",
      icon: "warning",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
    });
  }
  const navigate = useNavigate();
  const Addcatogery = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: categoryname,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(APiURl + "addCategory", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "Category created successfully!!") {
          Title(result.message);
          navigate("/elements/alerts");
        }
        if (
          result.message ==
          'E11000 duplicate key error collection: EmPower.categories index: name_1 dup key: { name: "music" }'
        ) {
          Warningalert();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div>
        <div className="main-container container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <h3 className="main-content-title mg-b-0 mg-b-lg-1">
                Add Category
              </h3>
            </div>
          </div>

          <Row className="row-lg">
            <Col lg={8}>
              <Card
                className="custom-card"
                style={{
                  marginTop: 100,
                  marginLeft: 300,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // boxshadow: "rgb(38, 57, 77) 0px 20px 30px -10px"
                }}
              >
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label
                        style={{ paddingBottom: "5px", paddingLeft: "5px" }}
                      >
                        Enter Category Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        style={{
                          color: "black",
                          border: "1px #cccccc solid !important",
                        }}
                        value={categoryname}
                        onChange={(e) => setCategoryname(e.target.value)}
                        placeholder="Enter category name"
                      />
                    </Form.Group>
                    <Button
                      variant="info"
                      className="rounded"
                      onClick={Addcatogery}
                      style={{
                        height: "30px",
                        marginTop: "20px",
                        float: "right",
                        width: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                      "rgba(243,63,129,255)"
                      }}

                    >
                      Add Category
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default Alerts1;

const Style = {
  container: {
    marginTop: "150px",
    marginLeft: "100px",
    boxshadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
  },
};
