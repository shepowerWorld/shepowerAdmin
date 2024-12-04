import { useState } from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const LeafletMaps = (props) => {
  const [result, setResult] = useState([]);
  const [result1, setResult1] = useState([]);
  const [text, setText] = useState('')

  const [text2, setText2] = useState('')
  const [img, setImg] = useState('')
  const location = useLocation();

  // const response = location.state.project;
  // const id = response._id;
  // console.log("id", id);

  // console.log("response");



  const handel = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "message": text
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://34.202.105.255:4002/storeAdminMsg", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        alert(result.message)
      })
      .catch(error => console.log('error', error));
  };


  const Imagepost = () => {
    var formdata = new FormData();
    formdata.append("gallery", img);
    formdata.append("message", text2);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    console.log("raw", formdata)
    fetch("http://34.202.105.255:4002/storeAdminImg", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        alert(result.message)
      })
      .catch(error => console.log('error', error));
    // alert(result)


  }

  const data = [

  ];

  return (

    <div className="bootcard" style={{ marginTop: 50 }}>
      <Row className="row-sm">
        <Col lg={6} xl={3} md={6} className="col-12">
          <Card className=" bg-primary bg-gradient">
            <Card.Body>
              <Row>
                <div className="col-6">
                  <div className="icon1 mt-2 text-center">
                    <i className="fe fe-users tx-40"></i>

                  </div>
                </div>
                <span className="text-white">Notification message</span>

              </Row>
            </Card.Body>
          </Card>
          <Col className="col-6">
            <div className="mt-0 text-center">
              <input type="text" value={text} onChange={(e) => { setText(e.target.value) }} />
              <h2 className="text-white mb-0">{result1}</h2>
            </div>
            <button style={{ background: 'linear-gradient(45deg, red, yellow)' }} onClick={handel}>send</button>
          </Col>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col lg={3} xl={3} md={3} className="col-12">
          <Card className="bg-danger bg-gradient text-white ">
            <Card.Body>
              <Row >
                <div className="col-6">
                  <div className="icon1 mt-2 text-center">
                    <i className="fe fe-pie-chart tx-40"></i>

                  </div>
                </div>
                <span className="text-white">Notification Image</span>

              </Row>
            </Card.Body>
          </Card>
          <Col className="col-6">
            <div className="mt-0 text-center">
              <input type="text" value={text2} onChange={(e) => { setText2(e.target.value) }} />
              <input type="file" name="file" onChange={(e) => { setImg(e.target.files[0]) }} />
              {/* <h2 className="text-white mb-0">{result}</h2> */}
            </div>
            <button style={{ background: 'linear-gradient(45deg, blue, yellow)' }} onClick={Imagepost}>send</button>
          </Col>
        </Col>
      </Row>




    </div>
  );
};

export default LeafletMaps;
