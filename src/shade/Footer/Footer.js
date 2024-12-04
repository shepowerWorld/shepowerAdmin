import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="main-footer">
      <Col md={12} sm={12} className=" text-center">
        <div className="container-fluid pt-0 ht-100p">
          {" "}
          <Link to="#" className="text-primary">

          </Link>
          <span className=""></span>
          <Link to="#">  </Link>
        </div>
      </Col>
    </div>
  );
}




