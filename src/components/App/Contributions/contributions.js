import React from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import * as rangeslider from "./Rangesliderdata";
const Rangeslider = () => (
  <div>
    {/* <!-- breadcrumb --> */}
    <div className="breadcrumb-header justify-content-between">
      <div className="left-content">
        <span className="main-content-title mg-b-0 mg-b-lg-1">
        Contributions Management
        </span>
      </div>
      <div className="justify-content-center mt-2">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
          Contributions Management
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="breadcrumb-item "
            active
            aria-current="page"
          >
            Contributions Management
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    {/* <!-- /breadcrumb --> */}

    {/* <!-- Row --> */}
    
  </div>
);

Rangeslider.propTypes = {};

Rangeslider.defaultProps = {};

export default Rangeslider;
