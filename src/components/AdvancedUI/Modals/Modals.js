import { useState } from "react";
import { Breadcrumb, Button, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./modal.css";
import { APiURl } from "../../Services/ApiAddress";

const Modals = () => {
  const [text1, setText] = useState();
  const [title,SetTitle]=useState();
  const [img, setImg] = useState();
  const location = useLocation();
  const [loading, setloading] = useState();
  console.log("Title", title);
  const token = sessionStorage.getItem('token');

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
    })
    
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

  const Imagepost = () => {
    if (title !== undefined && img !== undefined || text1 !== undefined && title!== undefined) {
      setloading(true);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);

      var formdata = new FormData();
      formdata.append("text", text1); // Use the text state variable
      formdata.append("image", img); // Use the img state variable
      formdata.append("title", title);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(APiURl+"allUserNotification", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          if (result.message == "Notification Sent To All Empower Users Successfully" || result.message == "Notification Sent To All Empower Users Successfully") {
            
            Title(result.message);
            setloading(false);
          }

          if (
            result.message == "No Users Available For Sending Notifications."
          ) {
            setloading(false);
            Title1(result.message, "No Users Found");
           
          }
          if(result.message == "Please Fill Notification Content")
          {
            
            setloading(false)
            Title1("Please Fill Notification Content", "");
          }
        })
        .catch((error) => console.log("error", error));
    } 
    else {
      Title1("Please Fill Notification Content", "");
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
   }

  return (
    <div
      className="bootcard d-flex "
      style={{ marginTop: 50, marginLeft: "%" }}
    >
      <Row style={{ marginTop: 10, marginLeft: "5%" }}>
        <Col lg={4} xl={4} md={4} className="col-12 falled" style={{marginTop:"5%"}}>
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
             <label for="exampleInputEmail1" class="form-label">
            Title
          </label>
            <input type="text"  class="form-control border" id="exampleInputEmail1" placeholder="Title" onChange={(e)=>{SetTitle(e.target.value)}} aria-describedby="emailHelp"></input>
          <label for="exampleInputEmail1" class="form-label">
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
          <label for="exampleInputEmail1" class="form-label">
            Select Image
          </label>
          <input
            class="form-control border"
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
              background:
                "rgba(243,63,129,255)",
            }}
          >
            {loading ? (
              <span class="loader pr-10" style={{ marginRight: "5px" }}></span>
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
            style={{ border: "1px soild", height: "500px" ,borderRadius:"16px"}}
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
              <div className="hiuser text-start">{title == undefined || title == ""? "Hi Users!" : title}</div>

              <div
                className="messagetext"
               
              >
                {text1 == undefined || text1 == "" ? (
                  <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                    aliquam, purus sit amet luctus venenatis, lectus magna
                    fringilla urna, porttitor
                  </>
                ) : (
                  <>{text1}</>
                )}
              </div>

              {img === undefined ? (
                null
              ) : <div><img src={img} style={{height:"200px"}}/></div>}
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Modals;
