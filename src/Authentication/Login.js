import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Store/Auth-context";
import authApi from "../api/authApi";

const SignIn = () => {
  const ctx = useContext(AuthContext);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("shePowerAdmin@gmail.com");
  const [password, setPassword] = useState("ADMIN@12");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("Admin_id");
    if (isAuth) {
      navigate("/");
    }
  }, [navigate]);

  const Login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { userName, password };

      const response = await authApi.loginAdmin(payload);

      if (!response.status) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status) {
        sessionStorage.setItem("Admin_id", response.admin._id);
        sessionStorage.setItem("token", response.tokens.accessToken);
        ctx.onLogin();
        console.log("response______________________________", response);

        navigate(`${process.env.PUBLIC_URL}dashboard/dashboard-1`, {
          replace: true,
        });
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <div className="square-box">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
      <div className="page" style={{ backgroundColor: "rgba(243,63,129,255)" }}>
        <div className="page-single">
          <div className="container" style={{ marginTop: "89px" }}>
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center">
                <div className="card-sigin">
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-4">
                        <Link
                          to="#"
                          className="d-flex"
                          style={{ alignItems: "center" }}>
                          <img
                            style={{
                              width: 140,
                              height: 110,
                              mixBlendMode: "mixed",
                              backgroundColor: "transparent",
                            }}
                            src={require("../assets/img/brand/shepower-1-removebg-preview.png")}
                            className="sign-favicon ht-40"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="main-signup-header">
                        <h6 className="font-weight-semibold mb-4">
                          Please sign in to continue.
                        </h6>
                        <div className="tab-menu-heading mb-2 border-bottom-0">
                          {error && <Alert variant="danger">{error}</Alert>}
                          <Form onSubmit={Login}>
                            <Form.Group className="form-group">
                              <Form.Label>UserName</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your username"
                                name="userName"
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                              />
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </Form.Group>
                            <Button
                              style={{
                                backgroundColor: "rgba(243,63,129,255)",
                                color: "#fff",
                              }}
                              className="btn btn-block"
                              type="submit">
                              Sign In
                            </Button>
                          </Form>
                          <div className="main-signin-footer text-center mt-3">
                            <p>
                              Don't have an account?{" "}
                              <Link
                                to={`${process.env.PUBLIC_URL}/authentication/signup`}>
                                Create an Account
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
