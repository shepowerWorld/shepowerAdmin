import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../Firebase/firebase';
import Authcontext from '../Store/Auth-context';
import AuthContext from '../Store/Auth-context';

const SignIn = () => {
  const { IsLoggedIn, onLogin } = useContext(AuthContext);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    "userName": "",
    "password": "",
  })
  console.log("authContext",IsLoggedIn)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setError("");
  }


  let navigate = useNavigate();
  const routeChange = () => {
    onLogin();
    let path = `${process.env.PUBLIC_URL}/dashboard/dashboard-1`;
    navigate(path,{replace:true});
  }

  useEffect(()=> {
    let isAuth = sessionStorage.getItem('Admin_id')
    if(isAuth && isAuth !== null || undefined) {
      navigate('/')
    }

  },[])

  const Login = (e) => {

    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "userName": userName,
      "password": password
    });

    var requestOptions = {
      mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://3.7.112.1:6002/adminLogin", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
    
        if (result.status === true) {
          if (result.admin.userName === userName && result.admin.password === password) {
            sessionStorage.setItem('Admin_id',result.admin._id)
            sessionStorage.setItem('token', result.tokens.accessToken)
            routeChange()
          }
        } else {
          alert(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        alert(err.message)
      });
  }

  return (
    <React.Fragment>
      <div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
      <div className="page " style={{backgroundColor:'rgba(243,63,129,255)'}}>
        <div className="page-single">
          <div className="container" style={{ marginTop: "89px" }} >
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div className="card-sigin">
                  {/* <!-- Demo content--> */}
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-4">
                        <Link to="#" className='d-flex ' style={{alignItems:"center"}}>
                          <img
                          style={{width :140,height:110,background:'none',mixBlendMode:'mixed',backgroundColor:'transparent',}}
                            src={require("../assets/img/brand/shepower-1-removebg-preview.png")}
                            className="sign-favicon ht-40"
                            alt="logo"
                          />
                        {/* <div style={{fontSize:"30px",fontFamily:"Merriweather",fontWeight:"600"}}>She Power</div> */}
                        </Link>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          {/* <h2 style={{color:''}}>Welcome back!</h2> */}
                          <h6 className="font-weight-semibold mb-4">
                            Please sign in to continue.
                          </h6>
                          <div className="panel panel-primary">
                            <div className=" tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                {err && <Alert variant="danger">{err}</Alert>}
                                <Form >
                                  <Form.Group className="form-group">
                                    <Form.Label className=''>UserName</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your userName"
                                      name="userName"
                                      type='text'
                                      value={userName}
                                      onChange={(e) => setUserName(e.target.value)}
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="form-group">
                                    <Form.Label>Password</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your password"
                                      name="password"
                                      type='password'
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      required
                                    />
                                  </Form.Group>
                                  <Button
                                  style={{backgroundColor:'rgba(243,63,129,255)',color:'#ffff'}}
                                    variant=""
                                    type='submit'
                                    className="btn  btn-block"
                                    onClick={Login}
                                  >
                                    Sign In
                                  </Button>


                              
                                  <div className="main-signin-footer text-center mt-3">
                              {/* <p><Link to="#" className="mb-3">Forgot password?</Link></p> */}
                               <p>Don't have an account ? <Link to={`${process.env.PUBLIC_URL}/authentication/signup`} className=""> Create an Account</Link></p>
                                </div>
                                 
                                </Form>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div >
      </div>
    </React.Fragment>
  );
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
