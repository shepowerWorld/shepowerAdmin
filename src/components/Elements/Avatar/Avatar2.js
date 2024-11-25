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
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { APiURl } from "../../Services/ApiAddress";

function Avatar2() {
  const navigate = useNavigate();
  const location = useLocation();
  const response = location.state;
  console.log("response", response);
  const id = response?.id;
  console.log("id", id);
  const subcategoryName = response?.name;
  console.log("name", subcategoryName);
  const token = sessionStorage.getItem('token');
  const [subcategoryname, setSubcategoryname] = useState(subcategoryName);
  function Primaryalert(messsage) {
    Swal.fire({
      title: "Well done!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: messsage,
    });
  }
  const Updatesubcatogery = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
      name: subcategoryname,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(APiURl+"updateSubCategory", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.message.includes("updated")) {
            Primaryalert(result.message)
             navigate("/elements/avatar")
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
                Update Subcategory
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
                        Enter SubcategoryName
                      </Form.Label>
                      <Form.Control
                        type="text"
                        style={{ color: "black" }}
                        value={subcategoryname}
                        onChange={(e) => setSubcategoryname(e.target.value)}
                        placeholder="Enter subcategory name"
                      />
                    </Form.Group>
                    <Button
                      variant="info"
                      className="rounded"
                      onClick={Updatesubcatogery}
                      style={{
                        height: "30px",
                        marginTop: "10px",
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "rgba(243,63,129,255)",
                      }}
                    >
                      Update Subcategory
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
export default Avatar2;

const Style = {
  container: {
    marginTop: "150px",
    marginLeft: "100px",
    boxshadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
  },
};
