import { Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
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
import "./subcatogery.css";

function Avatar1() {
  const navigate = useNavigate();
  const [subcategoryname, setSubcategoryname] = useState([]);
  console.log(subcategoryname);
  const [categoryid, setcategoryid] = useState();
  const [Subcategoryname1, setSubcategoryname1] = useState();
  console.log(subcategoryname);
  const token = sessionStorage.getItem('token');
  // const validate = (id) => {
  //     setcategoryid(id)
  //     console.log("if", id)
  // }

  useEffect(() => {
    category();
  }, []);

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
  const category = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APiURl + "getCategory", requestOptions)
      .then((response) => response.json())
      .then((result) => setSubcategoryname(result.intrest))
      .catch((error) => console.log("error", error));
  };

  const addsubcategory = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      addIntrest_id: categoryid,
      name: Subcategoryname1,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(APiURl+"addSubCategory", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.message == "SubCategory created successfully!!") {
          Title(result.message);
          navigate("/elements/avatar");
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
                Add Subcategory
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
                    <Form.Label>Select categoryName</Form.Label>
                    <Form.Group>
                      <select className="form-select"
                        style={{
                          height: "40px",
                          color:"#c6bcc9",
                          marginTop: "10px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #ededf5 ",
                          borderRadius: "4px",
                          backgroundColor:"white",
                          
                        }}
                        onClick={(e) => {
                          setcategoryid(e.target.value);
                        }}
                      >
                        <option>Select Category</option>
                        {subcategoryname.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <Form.Label>Enter SubcategoryName</Form.Label>
                      <Form.Control
                        type="text"
                        value={Subcategoryname1}
                        onChange={(e) => setSubcategoryname1(e.target.value)}
                        placeholder="Enter Subcategory name"
                      />
                    </Form.Group>
                    <Button
                      variant="info"
                      className="rounded addwidthmin"
                      onClick={addsubcategory}
                      style={{
                        height: "40px",
                        marginTop: "10px",
                        width: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "180px !important",float:"right",
                        background:
                          "rgba(243,63,129,255)"
                      }}
                    >
                      Add Subcategory
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
const Allcatogery = () => {
  const navigate = useNavigate();
};
export default Avatar1;

const Style = {
  container: {
    marginTop: "150px",
    marginLeft: "100px",
    boxshadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
  },
};
