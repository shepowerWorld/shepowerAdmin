import { useState } from "react";
import { Breadcrumb, Button, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./modal.css";
import { APiURl } from "../../Services/ApiAddress";
import axios from "axios";

const Modals = () => {
  const [text1, setText] = useState();
  const [title, SetTitle] = useState();
  const [img, setImg] = useState();
  const location = useLocation();
  const [loading, setloading] = useState();
  const token = sessionStorage.getItem("token");

  function Title(message) {
    Swal.fire({
      title: "Well done!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: message,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload(false);
      }
    });
  }

  function Title1(message, title) {
    Swal.fire({
      title: title,
      icon: "warning",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#38cab3",
      text: message,
    });
  }

  const Imagepost = async () => {
    if (
      (title !== undefined && img !== undefined) ||
      (text1 !== undefined && title !== undefined)
    ) {
      setloading(true);

      const myHeaders = {
        Authorization: "Bearer " + token,
      };

      const payload = {
        title: title,
        message: text1,
        filepath: img,
      };
      try {
        const response = await axios.post(
          APiURl + "addNotifications",
          payload,
          {
            headers: myHeaders,
          }
        );
        console.log("response_________________________", response);

        if (response?.data?.sucess) {
          const result = response.data;
          Title(response?.data?.message);
          setloading(false);
          setImg(null);
          setText(null);
          SetTitle(null);
        } else {
          Title1(response?.data?.message);
          setloading(false);
        }

        // if (
        //   result.message ===
        //   "Notification Sent To All Empower Users Successfully"
        // ) {
        //   Title(result.message);
        //   setloading(false);
        // } else if (
        //   result.message === "No Users Available For Sending Notifications."
        // ) {
        //   setloading(false);
        //   Title1(result.message, "No Users Found");
        // } else if (result.message === "Please Fill Notification Content") {
        //   setloading(false);
        //   Title1("Please Fill Notification Content", "");
        // }
      } catch (error) {
        console.log("error", error);
        setloading(false);
        Title1("Error occurred while sending notification", "");
      }
    } else {
      Title1("Please Fill Notification Content", "");
    }
  };

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImg(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(APiURl + "uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.path) {
          setImg(response.data.path);
          console.log("Image uploaded successfully:", response.data.path);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error uploading the image:", error);
        setImg(null);
      }
    }
  };

  return (
    <div
      className="bootcard d-flex "
      style={{ marginTop: 50, marginLeft: "%" }}
    >
      <Row style={{ marginTop: 10, marginLeft: "5%" }}>
        <Col
          lg={4}
          xl={4}
          md={4}
          className="col-12 falled"
          style={{ marginTop: "5%" }}
        >
          <Card
            className="bg-danger bg-gradient text-white "
            style={{ maxHeight: "90px" }}
          >
            <Card.Body>
              <Row>
                <div className="col-12 d-flex">
                  <div className="icon1 mt-2 ">
                    <i className="fe fe-pie-chart tx-40"></i>
                  </div>
                  <div
                    className="text-white text-start text-center mt-50"
                    style={{
                      marginTop: "4.3%",
                      marginLeft: "3%",
                      fontSize: "20px",
                    }}
                  >
                    Notification{" "}
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
          <Col className="col-6">
            <div className="mt-0 text-center"></div>
          </Col>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control border"
            id="exampleInputEmail1"
            placeholder="Title"
            onChange={(e) => {
              SetTitle(e.target.value);
            }}
            aria-describedby="emailHelp"
          ></input>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Message
          </label>
          <textarea
            className="form-control border"
            type="text"
            value={text1}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Enter the message"
            style={{
              color: "black",
              border: "2px solid gray !important",
            }}
            rows={3}
          />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Select Image
          </label>
          <input
            className="form-control border"
            type="file"
            id="formFile"
            name="file"
            onChange={onImageChange}
            style={{
              color: "black",
              marginTop: "5px",
              border: "2px solid gray !important",
            }}
          />

          <Button
            variant=""
            className="btn rounded btn-primary text-white"
            onClick={Imagepost}
            icon="true"
            style={{
              height: "40px", // Set the desired height here
              width: "100%",

              marginTop: "10px",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(243,63,129,255)",
            }}
          >
            {loading ? (
              <span
                className="loader pr-10"
                style={{ marginRight: "5px" }}
              ></span>
            ) : null}
            Send Notification
          </Button>
        </Col>
        <Col
          lg={4}
          xl={4}
          md={4}
          className="col-12 justify-content-center text-center falled"
          style={{ marginLeft: "12%" }}
        >
          <div
            className="ml-50 backgroundimg justify-content-center text-center"
            style={{
              border: "1px soild",
              height: "500px",
              borderRadius: "16px",
            }}
          >
            <div className="timee text-center ">12:53</div>
            <div className="dayy text-center">FRIDAY, FEBRUARY 17</div>
            <Card className="bgtrasnfort cardaaaa">
              <div className="bgtrasnfort d-flex">
                <img
                  src={require("../../../assets/img/small.png")}
                  className="bgtrasnfort"
                  width={16}
                  height={16}
                  alt="Small Image"
                />
                <div className="logogname pl-10">EmPower</div>
                <div style={{ marginLeft: "5px" }} className="now">
                  now
                </div>
              </div>
              <div className="hiuser text-start">
                {title === undefined || title === "" ? "Hi Users!" : title}
              </div>

              <div className="messagetext">
                {text1 === undefined || text1 === "" ? (
                  <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                    aliquam, purus sit amet luctus venenatis, lectus magna
                    fringilla urna, porttitor
                  </>
                ) : (
                  <>{text1}</>
                )}
              </div>

              {img === undefined ? null : (
                <div>
                  <img src={img} style={{ height: "200px" }} />
                </div>
              )}
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Modals;
